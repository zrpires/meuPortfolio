import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export async function preview(port = 4175) {
  const cwd = fileURLToPath(new URL('../', import.meta.url));
  const child = spawn(process.execPath, ['scripts/serve.mjs'], {
    cwd, env: { ...process.env, PORT: String(port) }, stdio: 'pipe',
  });
  let failure;
  child.once('error', error => { failure = error; });
  const url = `http://127.0.0.1:${port}`;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (failure || child.exitCode !== null) { child.kill(); throw failure || Error('Preview server exited.'); }
    try { if ((await fetch(url)).ok) return { url, close: () => child.kill() }; } catch { /* Wait for the local process. */ }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  child.kill();
  throw Error('Preview server did not start.');
}

export function browserOptions() {
  return process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH, args: process.env.CI ? [] : ['--no-sandbox'] }
    : {};
}
