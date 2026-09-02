export const knowledgeChecks = {
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
