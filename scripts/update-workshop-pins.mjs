import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = join(root, 'workshops.sources.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const dryRun = process.argv.includes('--dry-run');
const token = process.env.GITHUB_TOKEN;

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'ndc-oslo-workshop-source-sync',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(token ? { Authorization: `Bearer ${token}` } : {})
};

const fetchJson = async (url) => {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API request failed (${response.status}): ${url}`);
  }
  return response.json();
};

const parseGitHubRepository = (repository) => {
  const url = new URL(repository);
  if (url.hostname !== 'github.com') {
    throw new Error(`Only github.com workshop sources are supported: ${repository}`);
  }

  const [owner, name] = url.pathname.replace(/^\/|\/$/g, '').replace(/\.git$/, '').split('/');
  if (!owner || !name) {
    throw new Error(`Could not parse workshop repository: ${repository}`);
  }
  return { owner, name };
};

let changed = false;

for (const source of manifest.sources) {
  const { owner, name } = parseGitHubRepository(source.repository);
  const repository = await fetchJson(`https://api.github.com/repos/${owner}/${name}`);
  const commit = await fetchJson(
    `https://api.github.com/repos/${owner}/${name}/commits/${repository.default_branch}`
  );

  if (source.commit === commit.sha) {
    console.log(`${source.name}: already pinned to ${commit.sha}`);
    continue;
  }

  console.log(`${source.name}: ${source.commit} -> ${commit.sha}`);
  source.commit = commit.sha;
  changed = true;
}

if (changed && !dryRun) {
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

if (!changed) {
  console.log('All workshop sources are current.');
}
