export const knowledgeChecks = {
  'cli/03-mona-mayhem.md': {
    question:
      'When should you use a path-specific instruction file instead of `.github/copilot-instructions.md`?',
    answer:
      'Use `.github/copilot-instructions.md` for project-wide rules that should shape every request, such as build commands and repository conventions. Use a file under `.github/instructions/` with an `applyTo` glob when guidance only matters for certain paths or file types. Keeping specialized rules scoped avoids loading irrelevant context into every conversation.',
    sourceLabel: 'Add custom instructions for Copilot CLI',
    sourceUrl:
      'https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions'
  },
  'cli/04-plan-and-scaffold.md': {
    question:
      'Why use plan mode before asking Copilot to scaffold a feature that spans several files?',
    answer:
      'Plan mode separates deciding what to build from changing the code. Copilot can inspect the repository, ask clarifying questions, and propose an approach before edits begin, so misunderstandings are cheaper to correct. Direct execution is faster for small, well-scoped work; planning is safer when architecture, scope, or dependencies are still uncertain.',
    sourceLabel: 'Use GitHub Copilot CLI',
    sourceUrl:
      'https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview'
  },
  'cli/08-agents.md': {
    question:
      'When is a custom agent a better fit than custom instructions?',
    answer:
      'Custom instructions provide always-on guidance for work in their scope. A custom agent is an optional specialist with its own context, tools, and role, which makes it better for focused delegated work such as a security review or accessibility audit. The two can work together: instructions preserve project conventions while the agent supplies task-specific expertise.',
    sourceLabel: 'Compare Copilot CLI customization features',
    sourceUrl:
      'https://docs.github.com/en/copilot/concepts/agents/copilot-cli/comparing-cli-features'
  },
  'cli/09-skills.md': {
    question:
      'Why is the `description` in a skill especially important?',
    answer:
      'Copilot uses the description to decide whether a skill is relevant to the current request and should be loaded. A vague description makes activation unreliable, while a precise description names the task and conditions that should trigger the skill. This on-demand loading keeps specialized guidance out of unrelated conversations.',
    sourceLabel: 'Add agent skills to Copilot CLI',
    sourceUrl:
      'https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills'
  },
  'cli/10-mcp.md': {
    question:
      'Why should you review and limit an MCP server before connecting it to Copilot CLI?',
    answer:
      'A local MCP server runs code on your machine and exposes tools that Copilot can call with your account permissions. A malicious or compromised server could read sensitive files or take unintended actions, so treat it like any executable dependency: verify its publisher and source, then enable only the tools needed for the task. Sandboxing adds another boundary when trust is uncertain.',
    sourceLabel: 'Add MCP servers to Copilot CLI',
    sourceUrl:
      'https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers'
  },
  'copilot-app/3-add-star-rating.md': {
    question:
      "Why does each agent session use its own git worktree, and why should you review the session's diff?",
    answer:
      "A dedicated worktree and branch isolate one session's edits from other sessions, allowing several agents to work in parallel without colliding. The diff is your checkpoint for confirming the implementation, file scope, and project conventions before the changes reach a pull request. Isolation makes parallel work possible; review keeps the developer accountable for the result.",
    sourceLabel: 'Work with agent sessions',
    sourceUrl:
      'https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions'
  },
  'copilot-app/5-build-filtering.md': {
    question:
      'How do Interactive, Plan, and Autopilot modes change the amount of control you keep during a session?',
    answer:
      'Interactive mode pauses for your input as work progresses. Plan mode produces an approach for review before implementation, which is useful when scope or architecture needs agreement. Autopilot works independently through implementation and verification, so reserve it for clear, isolated tasks with strong instructions and meaningful tests.',
    sourceLabel: 'Choose a Copilot App session mode',
    sourceUrl:
      'https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions'
  },
  'copilot-app/6-mcp-playwright.md': {
    question:
      "What does MCP enable, and why should you evaluate a server's trustworthiness before connecting it?",
    answer:
      'MCP lets Copilot communicate with external tools and services, such as using Playwright to operate a real browser. Because an MCP server runs separately and can receive session context or perform actions on your machine, an untrusted server creates a meaningful security boundary. Verify the publisher and source, then grant only the capabilities the lesson requires.',
    sourceLabel: 'Understand Model Context Protocol',
    sourceUrl: 'https://docs.github.com/en/copilot/concepts/context/mcp'
  },
  'copilot-app/7-agent-merge.md': {
    question:
      'What does Agent Merge automate, and what responsibility does the developer retain?',
    answer:
      'Agent Merge handles the mechanical pull-request finish line: monitoring checks and reviews, addressing blockers, resolving conflicts when possible, and merging when GitHub allows. The developer still reviews the code and decides whether the change is acceptable. Automation removes coordination work, not ownership of code quality.',
    sourceLabel: 'Manage pull requests with Agent Merge',
    sourceUrl:
      'https://docs.github.com/en/copilot/how-tos/github-copilot-app/managing-issues-and-pull-requests'
  },
  'copilot-app/8-canvases.md': {
    question:
      'What distinguishes a canvas from a session chat, and how does its storage location affect who can use it?',
    answer:
      'A canvas is a persistent interactive surface that both you and the agent can update, while chat is primarily a conversational exchange. A canvas stored in `.github/extensions` travels with the repository and can be shared by the team. A user-scoped canvas under `~/.copilot/extensions` stays local to your machine.',
    sourceLabel: 'Work with canvas extensions',
    sourceUrl:
      'https://docs.github.com/en/copilot/how-tos/github-copilot-app/working-with-canvas-extensions'
  }
};
