// One-Line Office Joke: 24-Hour Sprint
// Writes a single office joke (1-200 chars) to /output/entry.txt,
// then re-reads the file and verifies it byte-for-byte.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const JOKE =
  "I raised an IT ticket about my chair \u2014 it was closed as 'working as intended', and now my back has filed a grievance.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outPath = resolve(outDir, "entry.txt");

// Strict validation: gate requires UTF-8 text of 1-200 characters,
// not only white space, with no trailing newline.
if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`Joke must be 1-200 characters, got ${JOKE.length}.`);
}
if (JOKE.trim().length === 0) {
  throw new Error("Joke must not be only white space.");
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("Joke must be a single line.");
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JOKE, "utf8");

// Re-read and compare byte-for-byte against the intended string.
const written = readFileSync(outPath, "utf8");
if (written !== JOKE) {
  throw new Error("Verification failed: written file does not match the joke.");
}
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(JOKE, "utf8")) {
  throw new Error("Verification failed: byte length mismatch.");
}
