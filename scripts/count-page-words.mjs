import { readFileSync } from "node:fs";

/**
 * Estima o número de palavras de conteúdo visível ao usuário em uma
 * página Next.js TSX, focando em:
 *  - texto literal entre tags JSX (>...<)
 *  - valores de strings em chaves de conteúdo conhecidas (text, title,
 *    answer, question, label, value, name, description, intro, eyebrow)
 *
 * Ignora deliberadamente: imports, props CSS, paths, alt text de imagens
 * (alt já é coberto por SEO de forma separada), keywords de metadata e
 * URLs de canonical/OG.
 */

const files = [
  ["casamentos  ", "app/eventos/casamentos/page.tsx"],
  ["15-anos     ", "app/eventos/15-anos/page.tsx"],
  ["corporativo ", "app/eventos/corporativo/page.tsx"],
];

const CONTENT_KEYS = new Set([
  "text",
  "title",
  "answer",
  "question",
  "label",
  "value",
  "name",
  "description",
  "intro",
  "eyebrow",
]);

const countWords = (s) =>
  s.split(/\s+/).filter((w) => /[a-zA-ZÀ-ÿ0-9]/.test(w)).length;

for (const [label, path] of files) {
  const src = readFileSync(path, "utf8");
  let words = 0;
  const captured = [];

  // 1) Texto literal entre tags JSX: >foo bar<
  for (const m of src.matchAll(/>([^<>{}]+)</g)) {
    const t = m[1].trim();
    if (/[a-zA-ZÀ-ÿ]/.test(t) && t.length > 1) {
      const w = countWords(t);
      words += w;
      captured.push(t);
    }
  }

  // 2) Strings em valores de propriedades de conteúdo
  // Captura padrões como `text: "..."` ou `answer: "..."` ou `question: "..."`
  // Suporta strings em " e em `
  const propRe = /\b(text|title|answer|question|label|value|name|description|intro|eyebrow)\s*:\s*(["`])([\s\S]*?)\2/g;
  for (const m of src.matchAll(propRe)) {
    const key = m[1];
    const val = m[3];
    if (!CONTENT_KEYS.has(key)) continue;
    if (!/[a-zA-ZÀ-ÿ]/.test(val)) continue;
    // Filtros para evitar contar metadata seo (description em metadata é ok contar como SEO)
    if (val.includes("http")) continue;
    if (val.startsWith("/")) continue;
    const w = countWords(val);
    words += w;
    captured.push(val.slice(0, 60));
  }

  console.log(label, "palavras:", words);
}
