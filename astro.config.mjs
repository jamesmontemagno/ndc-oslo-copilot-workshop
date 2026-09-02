import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkGithubAdmonitionsToDirectives from 'remark-github-admonitions-to-directives';

const base = process.env.BASE_PATH || '/';
const site = process.env.SITE_URL || 'http://localhost:4321';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [
      [
        remarkGithubAdmonitionsToDirectives,
        {
          mapping: {
            NOTE: 'note',
            TIP: 'tip',
            IMPORTANT: 'note',
            WARNING: 'caution',
            CAUTION: 'danger'
          }
        }
      ]
    ]
  },
  integrations: [
    starlight({
      title: 'NDC Oslo × GitHub Copilot',
      description:
        'Two hands-on GitHub Copilot labs for NDC Oslo 2026 with Kayla Cinnamon and James Montemagno.',
      favicon: '/favicon.svg',
      logo: {
        src: './src/assets/mark.svg',
        replacesTitle: false
      },
      customCss: ['./src/styles/global.css', './src/styles/starlight.css'],
      components: {
        Footer: './src/components/LessonFooter.astro'
      },
      sidebar: [
        { label: 'Workshop home', link: '/' },
        { label: 'Prepare', link: '/prepare/' },
        {
          label: '1 · VS Code',
          items: [
            { label: 'Lab overview', link: '/labs/vscode/' },
            { label: 'Setup & context engineering', link: '/labs/vscode/01-setup/' },
            { label: 'Design-first frontend', link: '/labs/vscode/02-design/' },
            { label: 'Custom Quiz Master', link: '/labs/vscode/03-quiz-master/' },
            { label: 'Multi-agent development', link: '/labs/vscode/04-multi-agent/' },
            { label: 'Completion & next steps', link: '/labs/vscode/05-complete/' }
          ]
        },
        {
          label: '2 · Copilot App',
          items: [
            { label: 'Lab overview', link: '/labs/copilot-app/' },
            { label: 'Prerequisites', link: '/labs/copilot-app/0-prerequisites/' },
            { label: 'Install the app', link: '/labs/copilot-app/1-install-copilot-app/' },
            { label: 'Guided app tour', link: '/labs/copilot-app/2-guided-tour/' },
            { label: 'First Tailspin session', link: '/labs/copilot-app/3-add-star-rating/' },
            { label: 'Custom instructions', link: '/labs/copilot-app/4-custom-instructions/' },
            { label: 'Build with Autopilot', link: '/labs/copilot-app/5-build-filtering/' },
            { label: 'Playwright MCP', link: '/labs/copilot-app/6-mcp-playwright/' },
            { label: 'Agent Merge', link: '/labs/copilot-app/7-agent-merge/' },
            { label: 'Canvases', link: '/labs/copilot-app/8-canvases/' },
            { label: 'Review', link: '/labs/copilot-app/9-review/' }
          ]
        },
        { label: 'Resources & attribution', link: '/resources/' }
      ]
    })
  ]
});
