import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { knowledgeChecks } from './knowledge-checks.mjs';
import { lessonSections } from './lesson-sections.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(join(root, 'workshops.sources.json'), 'utf8'));
const sourceRootArg = process.argv.indexOf('--source-root');
const cachedRoot =
  sourceRootArg >= 0 && process.argv[sourceRootArg + 1]
    ? resolve(process.argv[sourceRootArg + 1])
    : null;
const temporaryRoot = cachedRoot ? null : mkdtempSync(join(tmpdir(), 'ndc-oslo-workshops-'));
const contentRoot = join(root, 'src', 'content', 'docs', 'labs');
const overlayRoot = join(root, 'scripts', 'workshop-overlays');

const copilotAppDestinationNames = {
  '2-add-star-rating.md': '3-add-star-rating.md',
  '3-custom-instructions.md': '4-custom-instructions.md',
  '4-build-filtering.md': '5-build-filtering.md',
  '5-mcp-playwright.md': '6-mcp-playwright.md',
  '6-agent-merge.md': '7-agent-merge.md',
  '7-canvases.md': '8-canvases.md',
  '8-review.md': '9-review.md'
};

const shiftedCopilotAppRoutes = {
  '2-add-star-rating': '3-add-star-rating',
  '3-custom-instructions': '4-custom-instructions',
  '4-build-filtering': '5-build-filtering',
  '5-mcp-playwright': '6-mcp-playwright',
  '6-agent-merge': '7-agent-merge',
  '7-canvases': '8-canvases',
  '8-review': '9-review'
};

rmSync(contentRoot, { recursive: true, force: true });
mkdirSync(contentRoot, { recursive: true });

const sources = Object.fromEntries(
  manifest.sources.map((source) => {
    const location = cachedRoot
      ? join(cachedRoot, source.cacheDirectory)
      : join(temporaryRoot, source.cacheDirectory);

    if (!cachedRoot) {
      execFileSync('git', ['clone', '--quiet', '--no-checkout', source.repository, location], {
        stdio: 'inherit'
      });
      execFileSync('git', ['-C', location, 'checkout', '--quiet', source.commit], {
        stdio: 'inherit'
      });
    }

    if (!existsSync(location)) {
      throw new Error(`Missing source cache for ${source.key}: ${location}`);
    }

    const actualCommit = execFileSync('git', ['-C', location, 'rev-parse', 'HEAD'], {
      encoding: 'utf8'
    }).trim();
    if (actualCommit !== source.commit) {
      throw new Error(
        `${source.key} cache is at ${actualCommit}, but workshops.sources.json pins ${source.commit}`
      );
    }

    return [source.key, location];
  })
);

const titleFromMarkdown = (markdown, fallback) => {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1];
  return (heading || fallback)
    .replaceAll('"', "'")
    .replace(/<[^>]+>/g, '')
    .trim();
};

const normalizeLinks = (markdown, isIndex) =>
  markdown.replace(
    /(\]\(|:\s*)(?:\.\/)?([A-Za-z0-9_-]+)\.md(#[^\s)]*)?/g,
    (_, prefix, slug, hash = '') => `${prefix}${isIndex ? './' : '../'}${slug}/${hash}`
  );

const normalizeTaskMarkers = (markdown) => {
  let fence = null;
  return markdown
    .split('\n')
    .map((line) => {
      const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
      if (fenceMatch) {
        const marker = fenceMatch[1][0];
        fence = fence === marker ? null : marker;
        return line;
      }
      if (fence) return line;
      const normalized = line.replace(
        /^(\s*(?:[-*+]|\d+\.)\s+)\[\](?=\s)/,
        '$1[ ]'
      );
      return normalized === line ? line : normalized.trimEnd();
    })
    .join('\n');
};

const addKnowledgeCheck = (markdown, destinationFile) => {
  const key = destinationFile
    .slice(contentRoot.length + 1)
    .replaceAll('\\', '/');
  const check = knowledgeChecks[key];
  if (!check) return markdown;
  if (markdown.includes('## Check your understanding')) return markdown;

  const block = `## Check your understanding

${check.question}

<details>
<summary>Check your answer</summary>

${check.answer}

**Go deeper:** [${check.sourceLabel}](${check.sourceUrl}).

</details>`;

  const marker = key.startsWith('copilot-app/') ? /^## Resources/m : null;

  if (!marker) {
    const dividerIndex = markdown.lastIndexOf('\n---\n');
    if (dividerIndex < 0) {
      throw new Error(`Could not place knowledge check in ${key}`);
    }
    return `${markdown.slice(0, dividerIndex).trimEnd()}\n\n${block}\n${markdown.slice(dividerIndex)}`;
  }
  if (!marker.test(markdown)) {
    throw new Error(`Could not place knowledge check in ${key}`);
  }
  return markdown.replace(marker, `${block}\n\n$&`);
};

const addLessonSections = (markdown, destinationFile) => {
  const key = destinationFile
    .slice(contentRoot.length + 1)
    .replaceAll('\\', '/');
  const sections = lessonSections[key];
  if (!sections) return markdown;

  for (const section of sections) {
    if (markdown.includes(`## ${section.heading}`)) continue;
    if (!markdown.includes(section.before)) {
      throw new Error(`Could not place "${section.heading}" in ${key}`);
    }
    const insertionIndex = markdown.indexOf(section.before);
    const prefix = markdown.slice(0, insertionIndex);
    const spacer = prefix.endsWith('\n\n') ? '' : '\n';
    markdown =
      `${prefix}${spacer}## ${section.heading}\n\n${section.before}` +
      markdown.slice(insertionIndex + section.before.length);
  }
  return markdown;
};

const normalizeMarkdown = (sourceFile, destinationFile, options = {}) => {
  let markdown = readFileSync(sourceFile, 'utf8')
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n');
  if (options.transform) {
    markdown = options.transform(markdown);
  }
  const isIndex = basename(destinationFile) === 'index.md';
  markdown = normalizeLinks(markdown, isIndex);

  if (options.replacements) {
    for (const [pattern, replacement] of options.replacements) {
      markdown = markdown.replace(pattern, replacement);
    }
  }

  if (markdown.startsWith('---\n')) {
    const end = markdown.indexOf('\n---', 4);
    const frontmatter = markdown.slice(4, end).replace(/^slug:.*\n?/m, '');
    markdown = `---\n${frontmatter.trim()}\n---${markdown.slice(end + 4)}`;
  } else {
    const title = titleFromMarkdown(markdown, basename(sourceFile, '.md'));
    markdown = `---\ntitle: "${title}"\n---\n\n${markdown}`;
  }

  markdown = markdown.replace(
    /^(---\n[\s\S]*?\n---)\n+(?:#\s+[^\n]+\n+(?:---\n+)?)?/,
    '$1\n\n'
  );

  if (options.intro) {
    markdown = markdown.replace(
      /^(---\n[\s\S]*?\n---)\n?/,
      `$1\n\n${options.intro}\n\n`
    );
  }

  markdown = normalizeTaskMarkers(markdown);
  markdown = addLessonSections(markdown, destinationFile);
  markdown = addKnowledgeCheck(markdown, destinationFile);
  mkdirSync(dirname(destinationFile), { recursive: true });
  writeFileSync(destinationFile, markdown.trimEnd() + '\n');
};

const importMarkdownDirectory = (sourceDirectory, destinationDirectory, options = {}) => {
  for (const name of readdirSync(sourceDirectory)) {
    if (!name.endsWith('.md')) continue;
    if (options.exclude?.includes(name)) continue;
    const destinationName =
      options.indexFile === name ? 'index.md' : options.destinationNames?.[name] || name;
    const fileOptions =
      options.introFiles && !options.introFiles.includes(name)
        ? { ...options, intro: null }
        : options;
    normalizeMarkdown(
      join(sourceDirectory, name),
      join(destinationDirectory, destinationName),
      fileOptions
    );
  }
};

const shiftCopilotAppLesson = (markdown) => {
  const routePattern = new RegExp(
    `\\b(${Object.keys(shiftedCopilotAppRoutes).join('|')})\\b`,
    'g'
  );
  return markdown
    .replace(/\bLesson ([2-8])\b/g, (_, lesson) => `Lesson ${Number(lesson) + 1}`)
    .replace(routePattern, (route) => shiftedCopilotAppRoutes[route]);
};

importMarkdownDirectory(
  join(sources.vscode, 'workshop'),
  join(contentRoot, 'vscode'),
  {
    indexFile: '00-overview.md',
    exclude: ['GUIDE.md'],
    replacements: [
      [/\[← README\]\(\.\.\/README\.md\)\n?/, ''],
      [/\]\(\.\.\/00-overview\/\)/g, '](../)']
    ]
  }
);

importMarkdownDirectory(
  join(sources['copilot-app'], 'docs', 'app'),
  join(contentRoot, 'copilot-app'),
  {
    indexFile: 'README.md',
    destinationNames: copilotAppDestinationNames,
    introFiles: ['README.md', '0-prerequisites.md'],
    intro:
      '> [!NOTE]\n> This lab starts with a standalone `space-quiz` project for a guided tour, then uses the separate [Tailspin Toys template repository](https://github.com/github-samples/tailspin-toys) for the remaining lessons.',
    transform: shiftCopilotAppLesson
  }
);

importMarkdownDirectory(
  join(overlayRoot, 'copilot-app'),
  join(contentRoot, 'copilot-app'),
  { indexFile: 'README.md' }
);

const appImagesSource = join(sources['copilot-app'], 'docs', '_images');
const appImagesDestination = join(contentRoot, '_images');
mkdirSync(appImagesDestination, { recursive: true });
for (const name of readdirSync(appImagesSource)) {
  if (name.startsWith('app-')) {
    cpSync(join(appImagesSource, name), join(appImagesDestination, name));
  }
}

if (temporaryRoot) {
  rmSync(temporaryRoot, { recursive: true, force: true });
}

console.log(`Imported ${manifest.sources.length} pinned workshop sources.`);
