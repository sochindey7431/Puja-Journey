import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const run = (cmd, opts = {}) => execSync(cmd, { encoding: 'utf8', ...opts }).trim();

console.log('[Deploy] Building latest production bundle...');
run('npm run build');

console.log('[Deploy] Creating gh-pages commit...');
const indexPath = path.resolve('.git/index-gh-pages');
if (fs.existsSync(indexPath)) fs.unlinkSync(indexPath);

const env = {
  ...process.env,
  GIT_DIR: path.resolve('.git'),
  GIT_WORK_TREE: path.resolve('dist'),
  GIT_INDEX_FILE: indexPath,
};

run('git add -A', { env, cwd: path.resolve('dist') });
const tree = run('git write-tree', { env, cwd: path.resolve('dist') });
console.log('[Deploy] Root Tree hash:', tree);

const parent = run('git rev-parse origin/gh-pages');
console.log('[Deploy] Parent commit on gh-pages:', parent);

const commitMsg = 'Deploy verified music player fix to gh-pages';
const commit = run(`git commit-tree ${tree} -p ${parent} -m "${commitMsg}"`);
console.log('[Deploy] New commit on gh-pages:', commit);

run(`git update-ref refs/heads/gh-pages ${commit}`);
console.log('[Deploy] Local gh-pages branch updated.');

console.log('[Deploy] Pushing to origin/gh-pages...');
const pushRes = run('git push origin gh-pages');
console.log(pushRes || 'Pushed successfully');

