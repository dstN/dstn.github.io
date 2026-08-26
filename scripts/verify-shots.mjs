/**
 * Verification pass against the built site running under `astro preview`.
 * Checks what actually loads, then captures the pages for review.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile(new URL("../src/data/shots.json", import.meta.url), "utf8"));
/** Sites with only one theme legitimately show their dark capture in light mode. */
const SINGLE_THEME = new Set(Object.entries(manifest).filter(([, s]) => s.singleTheme).map(([slug]) => slug));

const BASE = process.env.BASE ?? "http://localhost:4321";
const OUT = process.argv[2] ?? ".";

const browser = await chromium.launch();
const results = [];

async function visit({ path: routePath, theme, width, height, label }) {
  const context = await browser.newContext({
    viewport: { width, height },
    // 1x: a full-page capture of /work at 2x overflows WebP's 16383px limit.
    deviceScaleFactor: 1,
    colorScheme: theme,
    reducedMotion: "reduce",
  });
  // The site stores its own choice under "theme"; dark is the default (no class).
  await context.addInitScript((t) => {
    try {
      window.localStorage.setItem("theme", t);
    } catch {}
  }, theme);

  const page = await context.newPage();
  const workImages = [];
  page.on("request", (r) => {
    const u = r.url();
    if (u.includes("/images/work/")) workImages.push(u.split("/").pop());
  });

  await page.goto(`${BASE}${routePath}`, { waitUntil: "networkidle", timeout: 30_000 });
  // Scroll the whole page so every lazy image gets its chance to load.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  // Wait for the visible images to actually decode. Images inside a display:none
  // picture never load by design, so they are excluded from the condition.
  await page
    .waitForFunction(
      () => {
        const visible = Array.from(document.images).filter((i) =>
          typeof i.checkVisibility === "function" ? i.checkVisibility() : i.offsetParent !== null,
        );
        return visible.length > 0 && visible.every((i) => i.complete && i.naturalWidth > 0);
      },
      null,
      { timeout: 20_000 },
    )
    .catch(() => console.warn(`  ! ${label}: some images never finished loading`));
  await page.waitForTimeout(300);

  const htmlClass = await page.evaluate(() => document.documentElement.className);
  const stale = theme === "light" ? "-dark-" : "-light-";
  const wrongTheme = workImages.filter(
    (f) => f.includes(stale) && ![...SINGLE_THEME].some((slug) => f.startsWith(`${slug}-`)),
  );

  results.push({
    label,
    route: routePath,
    theme,
    htmlClass: htmlClass || "(none = dark)",
    loaded: workImages.length,
    wrongTheme: wrongTheme.length,
    wrongList: wrongTheme,
  });

  const png = await page.screenshot({ fullPage: true });
  const meta = await sharp(png).metadata();
  const scaled = Math.round((meta.height ?? 0) * (900 / (meta.width ?? 900)));
  await writeFile(
    `${OUT}/verify-${label}.webp`,
    await sharp(png)
      // WebP tops out at 16383px per side; fall back to fitting by height.
      .resize(scaled > 16000 ? { height: 16000 } : { width: 900, withoutEnlargement: true })
      .webp({ quality: 70 })
      .toBuffer(),
  );

  await context.close();
}

await visit({ path: "/", theme: "dark", width: 1440, height: 900, label: "home-dark-desktop" });
await visit({ path: "/", theme: "light", width: 1440, height: 900, label: "home-light-desktop" });
await visit({ path: "/", theme: "dark", width: 390, height: 844, label: "home-dark-mobile" });
await visit({ path: "/work/", theme: "dark", width: 1440, height: 900, label: "work-dark-desktop" });
await visit({ path: "/work/", theme: "light", width: 1440, height: 900, label: "work-light-desktop" });
await visit({ path: "/work/", theme: "dark", width: 390, height: 844, label: "work-dark-mobile" });

await browser.close();

console.log("route".padEnd(22), "theme".padEnd(7), "html class".padEnd(16), "imgs".padEnd(6), "wrong-theme");
for (const r of results) {
  console.log(
    r.label.padEnd(22),
    r.theme.padEnd(7),
    r.htmlClass.padEnd(16),
    String(r.loaded).padEnd(6),
    r.wrongTheme === 0 ? "0  ok" : `${r.wrongTheme}  ${r.wrongList.join(", ")}`,
  );
}

const leaks = results.filter((r) => r.wrongTheme > 0);
if (leaks.length) {
  console.log("\nFAIL: inactive-theme images were fetched.");
  process.exitCode = 1;
} else {
  console.log("\nOK: only the active theme's screenshots were ever requested.");
}
