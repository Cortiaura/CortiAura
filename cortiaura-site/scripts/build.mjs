// Builds the site. TinaCMS (the /admin content editor) is built only when its
// keys are configured, so the website still deploys if Tina is not set up.
import { spawnSync } from 'node:child_process';

const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

if (process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN) {
  console.log('TinaCMS keys found: building the /admin editor.');
  run('npx', ['tinacms', 'build']);
} else {
  console.log('TinaCMS keys not set: skipping the /admin editor build.');
}
run('npx', ['next', 'build']);
