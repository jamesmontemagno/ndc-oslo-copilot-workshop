import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { knowledgeChecks } from './knowledge-checks.mjs';
import { lessonSections } from './lesson-sections.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const docsRoot = join(root, 'src', 'content', 'docs');
const labsDocsRoot = join(docsRoot, 'labs');
const required = [
  'prepare.md',
  'resources.md',
  'labs/vscode/index.md',
  'labs/copilot-app/index.md',
];
const errors = [];
const expectedTrackDirectories = ['_images', 'copilot-app', 'vscode'];
const expectedCopilotAppLessons = {
  '0-prerequisites.md': 0,
  '1-install-copilot-app.md': 1,
  '2-guided-tour.md': 2,
  '3-add-star-rating.md': 3,
  '4-custom-instructions.md': 4,
  '5-build-filtering.md': 5,
  '6-mcp-playwright.md': 6,
  '7-agent-merge.md': 7,
  '8-canvases.md': 8,
  '9-review.md': 9
};
const expectedCopilotAppPages = [...Object.keys(expectedCopilotAppLessons), 'index.md'];
const actualTrackDirectories = readdirSync(labsDocsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (actualTrackDirectories.join(',') !== expectedTrackDirectories.join(',')) {
  errors.push(`Unexpected workshop content directories: ${actualTrackDirectories.join(', ')}`);
}
const actualCopilotAppPages = readdirSync(join(labsDocsRoot, 'copilot-app'))
  .filter((name) => name.endsWith('.md'))
  .sort();
if (actualCopilotAppPages.join(',') !== expectedCopilotAppPages.join(',')) {
  errors.push(`Unexpected Copilot App lessons: ${actualCopilotAppPages.join(', ')}`);
}
if (!existsSync(join(root, 'scripts', 'workshop-overlays', 'copilot-app', '2-guided-tour.md'))) {
  errors.push('Missing durable Copilot App guided tour overlay.');
}
const copilotAppOverview = readFileSync(join(labsDocsRoot, 'copilot-app', 'index.md'), 'utf8');
for (const [name, lesson] of Object.entries(expectedCopilotAppLessons)) {
  const markdown = readFileSync(join(labsDocsRoot, 'copilot-app', name), 'utf8');
  if (!markdown.includes(`title: "Lesson ${lesson} -`)) {
    errors.push(`Incorrect lesson number in Copilot App page: ${name}`);
  }
  const route = name.slice(0, -3);
  if (!copilotAppOverview.includes(`${route}/`)) {
    errors.push(`Missing Copilot App overview link: ${route}/`);
  }
}
if (existsSync(join(root, 'labs'))) {
  errors.push('Runnable lab projects must live in their dedicated external repositories.');
}

const sourceManifest = JSON.parse(readFileSync(join(root, 'workshops.sources.json'), 'utf8'));
const sourceKeys = sourceManifest.sources.map((source) => source.key);
if (sourceKeys.join(',') !== 'vscode,copilot-app') {
  errors.push('Workshop sources must contain only VS Code and Copilot App, in that order.');
}

const favicon = readFileSync(join(root, 'public', 'favicon.svg'), 'utf8');
const headerMark = readFileSync(join(root, 'src', 'assets', 'mark.svg'), 'utf8');
if (favicon !== headerMark) {
  errors.push('The public favicon and Starlight header mark must stay identical.');
}

const findMalformedTaskMarkers = (markdown) => {
  const malformed = [];
  let fence = null;
  markdown.split(/\r?\n/).forEach((line, index) => {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[1][0];
      fence = fence === marker ? null : marker;
      return;
    }
    if (!fence && /^\s*(?:[-*+]|\d+\.)\s+\[\](?=\s)/.test(line)) {
      malformed.push(index + 1);
    }
  });
  return malformed;
};

for (const path of required) {
  if (!existsSync(join(docsRoot, path))) errors.push(`Missing required page: ${path}`);
}

const walk = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path);
    if (entry.isFile() && ['.md', '.mdx'].includes(extname(entry.name))) {
      const markdown = readFileSync(path, 'utf8');
      if (!/^---\r?\n/.test(markdown)) errors.push(`Missing frontmatter: ${path}`);
      if (/]\((?!https?:\/\/)[^)\s]+\.md(?:#[^)]+)?\)/.test(markdown)) {
        errors.push(`Unnormalized Markdown link: ${path}`);
      }
      if (markdown.includes('Add from MCP MCP')) {
        errors.push(`Incorrect MCP Registry label: ${path}`);
      }
      for (const line of findMalformedTaskMarkers(markdown)) {
        errors.push(`Malformed task marker at ${path}:${line}; use [ ] instead of []`);
      }
      for (const image of markdown.matchAll(/!\[[^\]]*]\((?!https?:|data:)([^)\s]+)\)/g)) {
        const imagePath = resolve(path, '..', image[1].split(/[?#]/)[0]);
        if (!existsSync(imagePath)) errors.push(`Missing image ${image[1]} in ${path}`);
      }
    }
  }
};

walk(docsRoot);

for (const [path, check] of Object.entries(knowledgeChecks)) {
  const fullPath = join(docsRoot, 'labs', path);
  if (!existsSync(fullPath)) {
    errors.push(`Missing knowledge-check page: ${path}`);
    continue;
  }
  const markdown = readFileSync(fullPath, 'utf8');
  if (!markdown.includes('## Check your understanding')) {
    errors.push(`Missing knowledge check in ${path}`);
  }
  if (!markdown.includes(check.question) || !markdown.includes(check.sourceUrl)) {
    errors.push(`Incomplete knowledge check in ${path}`);
  }
}

for (const [path, sections] of Object.entries(lessonSections)) {
  const fullPath = join(docsRoot, 'labs', path);
  if (!existsSync(fullPath)) {
    errors.push(`Missing sectioned lesson: ${path}`);
    continue;
  }
  const markdown = readFileSync(fullPath, 'utf8');
  for (const section of sections) {
    if (!markdown.includes(`## ${section.heading}`)) {
      errors.push(`Missing "${section.heading}" section in ${path}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Workshop content structure is valid.');
