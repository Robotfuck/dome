import { copyFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = resolve('public/.assetsignore');
const destination = resolve('dist/.assetsignore');
const requiredEntries = ['_worker.js', '_routes.json'];
const contents = await readFile(source, 'utf8');
const entries = contents.split(/\r?\n/).map((entry) => entry.trim()).filter(Boolean);

for (const requiredEntry of requiredEntries) {
  if (!entries.includes(requiredEntry)) {
    throw new Error(`public/.assetsignore must include ${requiredEntry}`);
  }
}

await copyFile(source, destination);
