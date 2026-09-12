import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.platform !== 'darwin') {
  console.error('iOS setup must be run on macOS because it creates an Xcode project.');
  process.exit(1);
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cap = resolve(root, 'node_modules', '.bin', 'cap');
const iosProject = resolve(root, 'ios', 'App', 'App.xcodeproj');
const command = existsSync(iosProject) ? ['sync', 'ios'] : ['add', 'ios'];

execFileSync(cap, command, { cwd: root, stdio: 'inherit' });

console.log('\niOS project is ready. Run `npm run ios:open` to open it in Xcode.');
