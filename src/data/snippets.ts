/**
 * Verbatim excerpts from the repos, shown on /work.
 *
 * These are copied out of the real source files, not written for display. Each
 * one has to carry actual logic — a config block or a doc comment proves
 * nothing. Where something is cut for length it is marked with an elision
 * comment on its own line. `source` must always name the file it came from.
 */

export interface Snippet {
  /** Matches Project.slug. */
  slug: string;
  /** What the reader should notice — becomes the <summary> text. */
  summary: string;
  source: string;
  lang: "js" | "ts";
  code: string;
}

export const snippets: Snippet[] = [
  {
    slug: "tower67",
    summary: "The test that stops mouse and voice input from drifting apart",
    source: "tower67 · src/commands/CommandBus.test.ts",
    lang: "ts",
    code: `it('produces an identical command from the click path and the speech path', () => {
  const text = 'HANSA 471 TAXI TO RUNWAY 27 VIA ALPHA';
  const issuedAt = 1_700_000_000_000;

  const fromMouse = makeCommand({ raw: text, source: 'mouse', issuedAt });
  const fromSpeech = makeCommand({ raw: text, source: 'speech', issuedAt });

  const { source: _mouseSource, ...mouseRest } = fromMouse;
  const { source: _speechSource, ...speechRest } = fromSpeech;

  expect(speechRest).toEqual(mouseRest);
  expect(bus.dispatch(fromMouse)).toEqual(bus.dispatch(fromSpeech));
});`,
  },
  {
    slug: "fli",
    summary: "Atomic write — a crashed run can never leave a half-written stylesheet",
    source: "fli · src/css.ts",
    lang: "ts",
    code: `const atomicWrite = async (filePath: string, content: string): Promise<void> => {
  const tmpPath = \`\${filePath}.\${randomUUID()}.tmp\`;
  try {
    await fs.promises.writeFile(tmpPath, content, 'utf8');
    await fs.promises.rename(tmpPath, filePath);
  } catch (err) {
    await fs.promises.unlink(tmpPath).catch(() => {});
    throw err;
  }
};`,
  },
  {
    slug: "gourmerge",
    summary: "Diffing two recipe commits by indexing both sides, not walking a tree",
    source: "GourMerge · server/utils/diff.ts",
    lang: "ts",
    code: `export function computeIngredientDiff(
  oldIngredients: CommitIngredient[],
  newIngredients: CommitIngredient[]
): IngredientDiffEntry[] {
  const oldMap = new Map<number, IngredientSnapshot>()
  const newMap = new Map<number, IngredientSnapshot>()

  for (const ing of normalizeIngredients(oldIngredients)) {
    oldMap.set(ing.ingredientId, ing)
  }
  for (const ing of normalizeIngredients(newIngredients)) {
    newMap.set(ing.ingredientId, ing)
  }

  const result: IngredientDiffEntry[] = []

  for (const [id, oldIng] of oldMap) {
    const newIng = newMap.get(id)

    if (!newIng) {
      result.push({ type: 'removed', ingredientId: id, /* ... */ })
    } else {
      const changes: ('quantity' | 'unit')[] = []
      if (oldIng.quantity !== newIng.quantity) changes.push('quantity')
      if (oldIng.unit !== newIng.unit) changes.push('unit')
      // ... push 'modified' when changes.length > 0, else 'unchanged'
    }
  }
  // ... a second pass picks up ids present only in newMap
}`,
  },
];

export function snippetFor(slug: string): Snippet | undefined {
  return snippets.find((s) => s.slug === slug);
}
