import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const ROOT = process.cwd();
const SOURCE_DIRS = ["src"];
const SOURCE_EXTENSIONS = new Set([".css", ".ts", ".tsx"]);

function collectFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = path.join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) return collectFiles(fullPath);
    return SOURCE_EXTENSIONS.has(path.extname(fullPath)) ? [fullPath] : [];
  });
}

function sourceFiles() {
  return SOURCE_DIRS.flatMap((dir) => collectFiles(path.join(ROOT, dir)));
}

function grep(pattern) {
  return sourceFiles().flatMap((file) => {
    const text = readFileSync(file, "utf8");
    return pattern.test(text) ? [path.relative(ROOT, file)] : [];
  });
}

test("source avoids generic generated-design defaults", () => {
  const bannedPatterns = [
    { label: "banned font", pattern: /\b(Newsreader|Geist|JetBrains_Mono|Inter|Roboto|Space Grotesk)\b/ },
    { label: "raw Tailwind blue accent", pattern: /\b(?:bg|text|border|ring|from|via|to)-blue-\d{2,3}\b/ },
    { label: "purple/violet/indigo gradient family", pattern: /\b(?:purple|violet|indigo)-\d{2,3}\b/ },
    { label: "glass/backdrop treatment", pattern: /\b(?:backdrop-blur|glassmorphism|bg-background\/|bg-white\/|bg-black\/)\b/ },
    { label: "large rounded card radius", pattern: /\brounded-(?:xl|2xl|3xl)\b/ },
    { label: "old amber-first palette", pattern: /#D1863A|#d1863a|oklch\(0\.7[24]\s+0\.14\s+67\)/ },
  ];

  const failures = bannedPatterns.flatMap(({ label, pattern }) =>
    grep(pattern).map((file) => `${label}: ${file}`),
  );

  assert.deepEqual(failures, []);
});
