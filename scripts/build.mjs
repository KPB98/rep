import { copyFile, cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist');

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all([
  copyFile(resolve(root, 'index.html'), resolve(output, 'index.html')),
  copyFile(resolve(root, 'storage.js'), resolve(output, 'storage.js')),
  copyFile(resolve(root, 'manifest.webmanifest'), resolve(output, 'manifest.webmanifest')),
  copyFile(resolve(root, 'sw.js'), resolve(output, 'sw.js')),
  cp(resolve(root, 'icons'), resolve(output, 'icons'), { recursive: true }),
  writeFile(resolve(output, '.nojekyll'), '')
]);

console.log('Built web app in dist/.');
