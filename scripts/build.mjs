import { createHash } from 'node:crypto';
import { copyFile, cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist');
const shellFiles = ['index.html', 'storage.js', 'manifest.webmanifest'];
const serviceWorkerTemplate = await readFile(resolve(root, 'sw.js'), 'utf8');

const hash = createHash('sha256');
for (const file of [...shellFiles, 'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png']) {
  hash.update(await readFile(resolve(root, file)));
}
hash.update(serviceWorkerTemplate);
const cacheVersion = hash.digest('hex').slice(0, 12);
const serviceWorker = serviceWorkerTemplate.replace('__BUILD_VERSION__', cacheVersion);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all([
  ...shellFiles.map(file => copyFile(resolve(root, file), resolve(output, file))),
  writeFile(resolve(output, 'sw.js'), serviceWorker),
  cp(resolve(root, 'icons'), resolve(output, 'icons'), { recursive: true }),
  writeFile(resolve(output, '.nojekyll'), '')
]);

console.log(`Built web app in dist/ with cache version ${cacheVersion}.`);
