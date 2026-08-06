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
          label: '1 · Copilot App',
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
        {
          label: '2 · Copilot CLI',
          items: [
            { label: 'Lab overview', link: '/labs/cli/' },
            { label: 'Setup', link: '/labs/cli/01-setup/' },
            { label: 'Guided CLI tour', link: '/labs/cli/02-guided-tour/' },
            { label: 'Get started with Mona Mayhem', link: '/labs/cli/03-mona-mayhem/' },
            { label: 'Plan & scaffold', link: '/labs/cli/04-plan-and-scaffold/' },
            { label: 'Build the game', link: '/labs/cli/05-agent-mode/' },
            { label: 'Design-first theming', link: '/labs/cli/06-design-vibes/' },
            { label: 'Polish & parallel work', link: '/labs/cli/07-polish/' },
            { label: 'Specialized agents', link: '/labs/cli/08-agents/' },
            { label: 'Skills', link: '/labs/cli/09-skills/' },
            { label: 'MCP servers', link: '/labs/cli/10-mcp/' },
            { label: 'Bonus', link: '/labs/cli/11-bonus/' }
          ]
        },
        { label: 'Resources & attribution', link: '/resources/' }
      ]
    })
  ]
});
