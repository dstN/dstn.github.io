/**
 * Single source of truth for the Selected Work section and the /work index.
 *
 * Facts come from PROJECTS.md. Nothing here is embellished — if a claim is not
 * in PROJECTS.md or the repo, it does not belong in this file.
 */

export type Tier = "featured" | "shipped" | "index";
export type Category = "web" | "mobile" | "tools" | "content" | "other";

export interface ProjectShot {
  /**
   * Frame name from scripts/shots.mjs — files are <slug>-<frame>-<theme>-<size>.webp.
   * Whether a site has one theme or two is read from shots.json, not declared here.
   */
  frame: string;
  alt: string;
}

export interface Project {
  slug: string;
  name: string;
  tier: Tier;
  category: Category;
  /** One line, index level. */
  pitch: string;
  /** Two or three sentences. Featured tier only. */
  summary?: string;
  /** The single strongest talking point, as one sentence. */
  proof?: string;
  stack: string[];
  links: {
    live?: string;
    /**
     * ONLY set this when the repo is genuinely public. Most of these repos are
     * private, and a Source link to a private repo is a 404 for every visitor.
     * Verify with `gh repo list dstN --json name,visibility` before adding one.
     */
    source?: string;
    npm?: string;
  };
  shot?: ProjectShot;
  /** Explains an absent link where the reason is worth stating. */
  note?: "client work" | "work in progress";
}

export const projects: Project[] = [
  // ─── Featured ────────────────────────────────────────────────────────────
  {
    slug: "gourmerge",
    name: "GourMerge",
    tier: "featured",
    category: "web",
    pitch: "Git for recipes — branches, commits, forks and diffable merge requests, applied to cooking.",
    summary:
      "Recipes are treated as repositories. You branch a dish, commit changes as full snapshots, fork someone else's version, and open a diffable GourMerge Request to propose your edits back. 69 API endpoints across 28 tables, with passkey auth and four languages.",
    proof:
      "Full GDPR self-service built on a GitHub-style ghost tombstone account, so hard-deleting a user never breaks referential integrity.",
    stack: ["Nuxt 4.5", "Vue 3.5", "Drizzle ORM", "MySQL 8.4", "TipTap 3", "Playwright"],
    links: { live: "https://gourmerge.de" },
    shot: {
      frame: "recipe",
      alt: "GourMerge recipe page showing a recipe with its branch and commit history controls",
    },
  },
  {
    slug: "bewerby",
    name: "bewerby",
    tier: "featured",
    category: "web",
    pitch: "Privacy-first job application tracker that never sends your data anywhere.",
    summary:
      "A Kanban board, PDF autofill, analytics and backups for job hunting — running entirely in the browser. Applications live in IndexedDB, PDF attachments in OPFS. No account, no server-side database, nothing to breach.",
    proof:
      "Audited against WCAG 2.2 AAA rather than AA, via automated axe-core scans across every route, theme and viewport.",
    stack: ["SvelteKit 2", "Svelte 5 Runes", "Dexie 4", "IndexedDB + OPFS", "axe-core", "PWA"],
    links: { live: "https://bewerby.de" },
    shot: {
      frame: "board",
      alt: "bewerby application board with its Kanban columns",
    },
  },
  {
    slug: "eurodraft",
    name: "EuroDraft",
    tier: "featured",
    category: "web",
    pitch: "Draft an all-time XI from sixty years of tournament squads, then simulate the tournament.",
    summary:
      "Players roulette their way to a dream team from historical national squads spanning 1960 to 2024, then play out groups, knockouts and a final. Ten languages, shareable results and a leaderboard behind rate-limited server routes.",
    proof:
      "Runs on a self-built data pipeline that assembles a roughly 4,600-player database from Wikipedia and an external football data source.",
    stack: ["Nuxt 4", "Pinia", "Nuxt UI v4", "MySQL", "i18n · 10 locales", "Playwright"],
    links: { live: "https://ed.rntm.de", source: "https://github.com/dstN/EuroDraft" },
    shot: {
      frame: "home",
      alt: "EuroDraft landing page showing the dream team draft concept",
    },
  },

  // ─── Shipped ─────────────────────────────────────────────────────────────
  {
    slug: "footyguess",
    name: "footyguess",
    tier: "shipped",
    category: "web",
    pitch: "Guess the footballer from progressively revealed career stats, transfers and nationality.",
    proof: "An autonomous Puppeteer and stealth batch scraper fills the SQLite database with real career data.",
    stack: ["Nuxt 4", "better-sqlite3", "Valibot", "Puppeteer"],
    links: { live: "https://footyguess.yinside.de" },
    shot: {
      frame: "game",
      alt: "footyguess game view with a player card and revealed clues",
    },
  },
  {
    slug: "vsgraph",
    name: "VSGraph",
    tier: "shipped",
    category: "content",
    pitch: "Interactive dashboard for German domestic intelligence statistics on politically motivated crime.",
    proof: "Turns a dense government PDF report into a public dashboard you can search and compare across years.",
    stack: ["Next.js 16", "React 19", "Recharts 3", "SSG"],
    links: { live: "https://vsgraph.de" },
    shot: {
      frame: "dashboard",
      alt: "VSGraph dashboard charting politically motivated crime statistics over time",
    },
  },
  {
    slug: "twittrarchivr",
    name: "Twittr Archivr",
    tier: "shipped",
    category: "web",
    pitch: "Search and explore a downloaded Twitter/X export locally, with nothing uploaded.",
    proof: "The whole archive is unzipped, parsed and searched in the browser — personal data never reaches a server.",
    stack: ["Vue 3", "Vite 8", "zip.js", "Tailwind CSS 4", "vue-i18n"],
    links: { live: "https://twittrarchivr.vercel.app" },
    shot: {
      frame: "home",
      alt: "Twittr Archivr interface for browsing an imported Twitter archive",
    },
  },
  {
    slug: "threadsdelete",
    name: "Threads Deleter",
    tier: "shipped",
    category: "tools",
    pitch: "CLI and web tool that bulk-deletes Threads posts through Meta's official API.",
    proof:
      "One hexagonal business core serves both the CLI and the web dashboard, with exponential backoff, a hard daily delete ceiling and token masking in logs.",
    stack: ["Node.js", "Express 5", "Commander", "Docker", "Jest"],
    links: { live: "https://threadsdelete.vercel.app", source: "https://github.com/dstN/threadsDeleter" },
    shot: {
      frame: "home",
      alt: "Threads Deleter web dashboard",
    },
  },
  {
    slug: "remcss",
    name: "remCSS",
    tier: "shipped",
    category: "tools",
    pitch: "Pure-CSS framework rooted in the golden ratio, with zero JavaScript runtime.",
    proof: "Built on CSS Layers, oklch(), container queries and @scope, published as @dstn/remcss.",
    stack: ["CSS Layers", "oklch()", "Container Queries", "@scope"],
    links: { live: "https://remcss.vercel.app", npm: "https://www.npmjs.com/package/@dstn/remcss" },
    shot: {
      frame: "docs",
      alt: "remCSS documentation site showing the framework's type scale",
    },
  },

  // ─── Index ───────────────────────────────────────────────────────────────
  {
    slug: "fli",
    name: "fli",
    tier: "index",
    category: "tools",
    pitch: "npm CLI that downloads Google Webfonts locally and injects optimised @font-face CSS.",
    proof:
      "Detects the framework, picks the target directory, writes atomically and rolls back on failure. This site uses it as a real dependency.",
    stack: ["TypeScript", "tsup", "@clack/prompts", "fonteditor-core"],
    links: { npm: "https://www.npmjs.com/package/@dstn/fli" },
  },
  {
    slug: "axie",
    name: "Axie",
    tier: "index",
    category: "tools",
    pitch: "Self-hosted accessibility audit microservice running Playwright and axe-core scans.",
    proof: "Generated reports are fully offline-capable — base64 fonts, inline SVGs, zero CDN dependencies.",
    stack: ["Fastify 5", "Drizzle ORM", "MariaDB 11", "Playwright", "Docker"],
    links: {},
  },
  {
    slug: "scanland",
    name: "scaNLand",
    tier: "index",
    category: "mobile",
    pitch: "Offline camera-OCR scanner that identifies producers from EU food approval numbers.",
    proof: "The full 16,000-entry lookup database ships inside the app, so scanning works with no connection at all.",
    stack: ["Ionic 8", "Vue 3", "Capacitor 8", "Fastify 5", "SQLite", "Turborepo"],
    links: {},
  },
  {
    slug: "worldcoup",
    name: "Weltcoup",
    tier: "index",
    category: "mobile",
    pitch: "Satirical Flutter collectible-album game with gacha mechanics and local peer-to-peer trading.",
    proof: "Offline-first SQLite with server sync, plus real P2P trading over Bluetooth and WiFi Direct.",
    stack: ["Flutter", "Riverpod", "drift", "Express 5", "MySQL"],
    links: {},
  },
  {
    slug: "spotifyscandals",
    name: "spotifyscandals",
    tier: "index",
    category: "web",
    pitch: "Scans Spotify playlists and surfaces documented controversies about the artists, with verified sources.",
    proof: "Gemini handles both live web research and cost-efficient batch processing across many artists at once.",
    stack: ["Svelte 5", "FastAPI", "SQLAlchemy 2.0", "Google Gemini"],
    links: {},
  },
  {
    slug: "tower67",
    name: "tower67",
    tier: "index",
    category: "web",
    pitch: "2D air-traffic-control game driven by mouse or voice through one shared command pipeline.",
    proof:
      "A custom ESLint rule enforces the one-way dependency from the framework-free core to its adapters, and a test guarantees mouse and voice input produce identical commands.",
    stack: ["Vanilla TypeScript", "Canvas 2D", "Vite 8", "Vitest 4", "Zero runtime deps"],
    links: { source: "https://github.com/dstN/tower67" },
    note: "work in progress",
  },
  {
    slug: "mainstreet40",
    name: "mainstreet40",
    tier: "index",
    category: "content",
    pitch: "Monorepo for a rock cover band: Astro frontend, Directus headless CMS, fully editor-maintainable.",
    proof: "A dedicated test:a11y script pairs axe-core with Lighthouse CI as the default test suite.",
    stack: ["Astro 7", "Directus 12", "Tailwind CSS 4", "MySQL 8", "Docker Compose"],
    links: {},
    note: "client work",
  },
  {
    slug: "wc26-dashboard",
    name: "WC26 Data Engine",
    tier: "index",
    category: "content",
    pitch: "Parses FIFA World Cup 2026 PDF reports into an analytics dashboard over 96 matches and 1,248 players.",
    proof:
      "End-to-end typed contract: openapi-typescript generates the frontend types straight from the FastAPI OpenAPI schema.",
    stack: ["SvelteKit", "FastAPI", "SQLAlchemy 2.0", "MySQL 8", "Docker Compose"],
    links: { source: "https://github.com/dstN/wc26-dashboard" },
  },
  {
    slug: "portfolio",
    name: "dstn.github.io",
    tier: "index",
    category: "content",
    pitch: "This site. Static Astro, zero JS by default, hand-written CSS on oklch tokens.",
    proof: "Self-hosts its fonts through my own npm package, @dstn/fli.",
    stack: ["Astro 7", "TypeScript", "Vanilla CSS", "LightningCSS"],
    links: { source: "https://github.com/dstN/dstN.github.io" },
  },
  {
    slug: "detectivegame",
    name: "detectivegame",
    tier: "index",
    category: "other",
    pitch: "Existentialist neo-noir detective RPG in Godot, set in an occupied dieselpunk Paris.",
    proof:
      "CI verifies the whole project headlessly — import, compile sweep, boot smoke test, unit tests — with no editor GUI.",
    stack: ["Godot 4.5", "GDScript 2.0", "GdUnit4"],
    links: {},
    note: "work in progress",
  },
  {
    slug: "videomaker",
    name: "Video Factory",
    tier: "index",
    category: "other",
    pitch: "Dockerised pipeline that turns Reddit horror stories into narrated vertical videos.",
    proof:
      "Hybrid of a cloud LLM and fully local models, with voice cloning on CPU and WhisperX plus NVENC rendering on GPU inside an 8 GB VRAM budget.",
    stack: ["Python 3.12", "FastAPI", "Gemini", "WhisperX", "MoviePy", "Docker"],
    links: {},
  },
];

// Not listed yet: kz-gedenkstaette and ulas-arztpraxis are built but not
// published, so they stay out of the data until they go live.
export const featured = projects.filter((p) => p.tier === "featured");
export const shipped = projects.filter((p) => p.tier === "shipped");

/** Order and labels for the /work index. */
export const categories: { id: Category; label: string }[] = [
  { id: "web", label: "Web apps" },
  { id: "mobile", label: "Mobile" },
  { id: "tools", label: "Tools & CLIs" },
  { id: "content", label: "Content, CMS & dashboards" },
  { id: "other", label: "Games & pipelines" },
];

export function byCategory(id: Category): Project[] {
  return projects.filter((p) => p.category === id);
}
