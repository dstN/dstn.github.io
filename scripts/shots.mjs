/**
 * Screenshot pipeline for the Selected Work section.
 *
 * Captures every live project in dark + light, desktop + mobile, and writes
 * optimised .webp into public/images/work/ plus a manifest the Astro build
 * asserts against.
 *
 *   npm run shots                 all sites
 *   npm run shots -- gourmerge    one or more slugs
 *
 * Browsers come from the machine's existing Playwright install; nothing is
 * downloaded here.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("public/images/work");
const MANIFEST = path.resolve("src/data/shots.json");

/** Capture geometry. Output widths are ~2x the CSS size the image is shown at. */
const VIEWPORTS = {
  desktop: {
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    outputs: { desktop: 1440, thumb: 640 },
  },
  mobile: {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    outputs: { mobile: 780 },
  },
};

/** Tried in order; every failure is ignored. Consent walls differ per site. */
const CONSENT_SELECTORS = [
  '[data-testid="consent-accept"]',
  "#cookie-accept",
  ".cookie-accept",
  'button:has-text("Alle akzeptieren")',
  'button:has-text("Akzeptieren")',
  'button:has-text("Einverstanden")',
  'button:has-text("Zustimmen")',
  'button:has-text("Accept all")',
  'button:has-text("Accept")',
  'button:has-text("Got it")',
];

/** Every capture is taken in English so the portfolio reads consistently. */
const LOCALE = "en-US";

/**
 * `theme` maps a mode to localStorage entries seeded before first paint.
 * Sites honouring prefers-color-scheme need nothing extra — the browser
 * context colorScheme already covers them.
 *
 * `storage` and `cookies` pin the app's own language, which the browser locale
 * alone does not always settle: GourMerge defaults to German and keeps English
 * behind an /en prefix, EuroDraft defaults to English but redirects on the
 * Accept-Language header.
 */
const SITES = [
  {
    slug: "gourmerge",
    base: "https://gourmerge.de",
    theme: (mode) => ({ "nuxt-color-mode": mode }),
    // defaultLocale is 'de' with strategy 'prefix_except_default', so English
    // lives under /en and the cookie stops the root redirect fighting it.
    cookies: [{ name: "gourmerge_locale", value: "en" }],
    frames: [
      { name: "home", path: "/en" },
      { name: "explore", path: "/en/explore" },
      { name: "glossary", path: "/en/help/glossary" },
    ],
    // Recipe detail pages are the interesting view but their URLs are dynamic.
    // The app does not locale-prefix them, so the /en prefix is added here.
    discover: async (page) => {
      await page.goto("https://gourmerge.de/en/explore", { waitUntil: "networkidle", timeout: 45_000 });
      const href = await page.evaluate(() => {
        const skip = ["auth", "legal", "help", "admin", "dev", "explore", "en"];
        return (
          Array.from(document.querySelectorAll("a[href]"))
            .map((a) => a.getAttribute("href") ?? "")
            .find((h) => /^\/[^/]+\/[^/]+$/.test(h) && !skip.includes(h.split("/")[1])) ?? null
        );
      });
      return href ? [{ name: "recipe", path: `/en${href}` }] : [];
    },
  },
  {
    slug: "bewerby",
    base: "https://bewerby.de",
    theme: (mode) => ({ "bewerby-theme": mode, "bewerby-locale": "en" }),
    frames: [
      { name: "board", path: "/" },
      { name: "analytics", path: "/analytics" },
      { name: "settings", path: "/settings" },
    ],
  },
  {
    slug: "eurodraft",
    base: "https://ed.rntm.de",
    theme: (mode) => ({ "nuxt-color-mode": mode }),
    // defaultLocale is 'en' and unprefixed; the cookie stops browser-language
    // detection redirecting the root to German.
    cookies: [{ name: "i18n_redirected", value: "en" }],
    frames: [
      { name: "home", path: "/" },
      { name: "leaderboard", path: "/leaderboard" },
      { name: "compare", path: "/compare" },
    ],
  },
  {
    slug: "footyguess",
    base: "https://footyguess.yinside.de",
    // Nuxt UI colorMode is disabled in this app - single theme by design.
    singleTheme: true,
    frames: [{ name: "game", path: "/" }],
  },
  {
    slug: "vsgraph",
    base: "https://vsgraph.de",
    theme: (mode) => ({ theme: mode }),
    frames: [{ name: "dashboard", path: "/" }],
  },
  {
    slug: "twittrarchivr",
    base: "https://twittrarchivr.vercel.app",
    theme: (mode) => ({ theme: mode, locale: "en" }),
    frames: [{ name: "home", path: "/" }],
  },
  {
    slug: "threadsdelete",
    base: "https://threadsdelete.vercel.app",
    // No theme machinery in the repo at all - the site is dark-only by design.
    singleTheme: true,
    frames: [{ name: "home", path: "/" }],
  },
  {
    slug: "remcss",
    base: "https://remcss.vercel.app",
    theme: (mode) => ({ theme: mode }),
    frames: [{ name: "docs", path: "/" }],
  },
];

/** Kills anything that would make two runs differ. */
const FREEZE_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    caret-color: transparent !important;
  }
  html { scroll-behavior: auto !important; }
`;

async function dismissConsent(page) {
  for (const selector of CONSENT_SELECTORS) {
    try {
      const el = page.locator(selector).first();
      if (await el.isVisible({ timeout: 400 })) {
        await el.click({ timeout: 1_500 });
        await page.waitForTimeout(300);
        return selector;
      }
    } catch {
      // Selector absent or not clickable - expected for most sites.
    }
  }
  return null;
}

async function capture(browser, site, frame, mode, vpName) {
  const preset = VIEWPORTS[vpName];
  const context = await browser.newContext({
    viewport: preset.viewport,
    deviceScaleFactor: preset.deviceScaleFactor,
    isMobile: preset.isMobile ?? false,
    hasTouch: preset.hasTouch ?? false,
    colorScheme: mode,
    reducedMotion: "reduce",
    locale: LOCALE,
    timezoneId: "Europe/Berlin",
  });

  if (site.cookies) {
    const { hostname } = new URL(site.base);
    await context.addCookies(site.cookies.map((c) => ({ ...c, domain: hostname, path: "/" })));
  }

  if (site.theme) {
    const entries = site.theme(mode);
    await context.addInitScript((seed) => {
      for (const [key, value] of Object.entries(seed)) {
        try {
          window.localStorage.setItem(key, value);
        } catch {
          // Storage blocked - the colorScheme hint still applies.
        }
      }
    }, entries);
  }

  const page = await context.newPage();
  try {
    const url = new URL(frame.path, site.base).toString();
    await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
    await dismissConsent(page);
    await page.addStyleTag({ content: FREEZE_CSS });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);
    return await page.screenshot({ type: "png" });
  } finally {
    await context.close();
  }
}

/** Mean luminance 0-255. Used to prove the theme switch actually took. */
async function meanLuma(buffer) {
  const stats = await sharp(buffer).greyscale().stats();
  return stats.channels[0].mean;
}

async function writeVariants(buffer, slug, frameName, mode, outputs) {
  const written = [];
  for (const [suffix, width] of Object.entries(outputs)) {
    const file = `${slug}-${frameName}-${mode}-${suffix}.webp`;
    const out = await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toBuffer();
    await writeFile(path.join(OUT_DIR, file), out);
    const meta = await sharp(out).metadata();
    written.push({ file, width: meta.width, height: meta.height, bytes: out.length });
  }
  return written;
}

/**
 * Rebuilds the manifest by reading what is actually on disk, so it can never
 * drift from the files the Astro build references. Safe to run on its own:
 *   npm run shots -- --manifest-only
 */
async function buildManifest() {
  const files = (await readdir(OUT_DIR)).filter((f) => f.endsWith(".webp")).sort();
  const manifest = {};

  for (const file of files) {
    const match = /^(.+?)-([^-]+)-(dark|light)-(desktop|mobile|thumb)\.webp$/.exec(file);
    if (!match) {
      console.warn(`  ! unparseable filename, skipped: ${file}`);
      continue;
    }
    const [, slug, frame, theme, size] = match;
    const { width, height } = await sharp(path.join(OUT_DIR, file)).metadata();

    manifest[slug] ??= { singleTheme: true, frames: {} };
    manifest[slug].frames[frame] ??= {};
    manifest[slug].frames[frame][theme] ??= {};
    manifest[slug].frames[frame][theme][size] = { file, width, height };
    if (theme === "light") manifest[slug].singleTheme = false;
  }

  const ordered = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(MANIFEST, `${JSON.stringify(ordered, null, 2)}\n`);
  return ordered;
}

/**
 * Deletes captures that the built site does not reference, then rebuilds the
 * manifest. Run after `npm run build`, once the featured frames are settled:
 *   npm run build && npm run shots -- --prune
 */
async function prune() {
  const pages = ["dist/index.html", "dist/work/index.html"].map((p) => path.resolve(p));
  let html = "";
  for (const page of pages) {
    try {
      html += await readFile(page, "utf8");
    } catch {
      throw new Error(`--prune needs a build first: ${page} is missing. Run \`npm run build\`.`);
    }
  }

  const files = (await readdir(OUT_DIR)).filter((f) => f.endsWith(".webp"));
  const orphans = files.filter((f) => !html.includes(f));

  let freed = 0;
  for (const file of orphans) {
    const full = path.join(OUT_DIR, file);
    freed += (await stat(full)).size;
    await rm(full);
  }

  await buildManifest();
  console.log(
    `pruned ${orphans.length} unreferenced capture(s), freed ${(freed / 1024 / 1024).toFixed(2)} MB, ${files.length - orphans.length} kept`,
  );
  for (const file of orphans) console.log(`  - ${file}`);
  return orphans.length;
}

async function run() {
  const only = process.argv.slice(2).filter((a) => !a.startsWith("-"));

  if (process.argv.includes("--prune")) {
    await prune();
    return;
  }

  if (process.argv.includes("--manifest-only")) {
    const manifest = await buildManifest();
    const frames = Object.values(manifest).reduce((n, s) => n + Object.keys(s.frames).length, 0);
    console.log(`manifest rebuilt: ${Object.keys(manifest).length} sites, ${frames} frames`);
    return;
  }

  const targets = only.length ? SITES.filter((s) => only.includes(s.slug)) : SITES;

  if (!targets.length) {
    console.error(`No site matched: ${only.join(", ")}`);
    console.error(`Known slugs: ${SITES.map((s) => s.slug).join(", ")}`);
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const rows = [];
  const warnings = [];

  try {
    for (const site of targets) {
      let frames = [...site.frames];

      if (site.discover) {
        const context = await browser.newContext({ locale: LOCALE });
        if (site.cookies) {
          const { hostname } = new URL(site.base);
          await context.addCookies(site.cookies.map((c) => ({ ...c, domain: hostname, path: "/" })));
        }
        const page = await context.newPage();
        try {
          const extra = await site.discover(page);
          frames = frames.concat(extra);
          if (extra.length) {
            console.log(`  discovered ${site.slug}: ${extra.map((f) => f.path).join(", ")}`);
          } else {
            warnings.push(`${site.slug}: discover found no dynamic frame`);
          }
        } catch (error) {
          warnings.push(`${site.slug}: discover failed - ${error.message}`);
        } finally {
          await context.close();
        }
      }

      const modes = site.singleTheme ? ["dark"] : ["dark", "light"];

      for (const frame of frames) {
        const luma = {};

        for (const mode of modes) {
          for (const vpName of Object.keys(VIEWPORTS)) {
            process.stdout.write(`  ${site.slug}/${frame.name} ${mode} ${vpName} ... `);
            try {
              const png = await capture(browser, site, frame, mode, vpName);
              if (vpName === "desktop") luma[mode] = await meanLuma(png);
              const files = await writeVariants(png, site.slug, frame.name, mode, VIEWPORTS[vpName].outputs);
              rows.push(...files.map((f) => ({ site: site.slug, frame: frame.name, mode, ...f })));
              console.log("ok");
            } catch (error) {
              console.log("FAILED");
              warnings.push(`${site.slug}/${frame.name} ${mode} ${vpName}: ${error.message}`);
            }
          }
        }

        // A dark and a light capture that look the same means the switch never fired.
        if (modes.length === 2 && luma.dark !== undefined && luma.light !== undefined) {
          const delta = Math.abs(luma.light - luma.dark);
          if (delta < 25) {
            warnings.push(
              `${site.slug}/${frame.name}: dark/light differ by only ${delta.toFixed(1)}/255 - theme switch likely did not apply`,
            );
          }
        }

      }
    }
  } finally {
    await browser.close();
  }

  await buildManifest();

  console.log("\n--- written ---------------------------------------------------");
  let total = 0;
  for (const r of rows) {
    total += r.bytes;
    const dims = `${r.width}x${r.height}`;
    console.log(`  ${r.file.padEnd(46)} ${dims.padStart(11)} ${(r.bytes / 1024).toFixed(1).padStart(7)} KB`);
  }
  console.log(`  ${String(rows.length).padStart(3)} files, ${(total / 1024 / 1024).toFixed(2)} MB total`);

  if (warnings.length) {
    console.log("\n--- warnings --------------------------------------------------");
    for (const w of warnings) console.log(`  ! ${w}`);
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
