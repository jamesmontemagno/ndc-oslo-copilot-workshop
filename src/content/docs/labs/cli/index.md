---
title: "🎮 Mona Mayhem — GitHub Copilot Workshop"
---

> **Duration:** 60–90 minutes for the facilitated core; advanced deep dives are available if time permits.
> **Level:** Intermediate  
> **Stack:** Astro / Node.js / TypeScript

Build a retro arcade GitHub contribution comparison app — **Mona Mayhem** — while learning the full spectrum of GitHub Copilot workflows. This NDC Oslo edition focuses on the GitHub Copilot CLI experience.

---

## Workshop path

Follow the CLI instructions throughout this edition. Parts 1–7 form the facilitated core; Parts 8–10 are advanced deep dives, and Part 11 is optional.

---

## 📋 Quick Checklist

Before you begin, verify:

- [ ] GitHub Copilot is enabled for your account
- [ ] [Node.js 22 or 24](https://nodejs.org/) installed
- [ ] [Git](https://git-scm.com/downloads) installed and configured
- [ ] [Visual Studio Code](https://code.visualstudio.com/) installed
- [ ] Your browser and terminal are both ready




- [ ] [GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli) installed and available as `copilot`
> **Tip:** The starter repository includes a Dev Container if you prefer a pre-configured terminal environment.

---

## 🧠 What You'll Learn

| # | Skill | Description |
|---|-------|-------------|
| 1 | **Context Engineering** | Teach Copilot about your codebase with instructions, references, and clear constraints |
| 2 | **Plan First** | Draft architecture before implementation |
| 3 | **Agentic Implementation** | Let Copilot carry out multi-step coding work with your supervision |
| 4 | **Iterative Design** | Use Copilot to transform visuals and refine interaction details |
| 5 | **Parallel Workflows** | Split work across agents, sessions, or delegated tasks |
| 6 | **Specialized Agents & Instructions** | Give Copilot personas and always-on, path-scoped project rules |
| 7 | **Reusable Skills** | Package expertise Copilot loads automatically when a prompt matches |
| 8 | **Live Tools via MCP** | Connect Copilot to GitHub, a real browser, and up-to-date docs |




### Copilot CLI Feature Focus

- **Interactive CLI sessions** with `copilot`
- **`/plan` and Shift+Tab** for structured planning
- **Autonomous edits** with inline approvals and `/diff`
- **`/fleet`, `/delegate`, and `/review`** for parallelism and quality gates
- **`/agent`, `/skills`, and `/mcp`** for custom agents, skills, and live tool servers


---

## 📚 Lab Parts

| Part | Title | Description |
|------|-------|-------------|
| [**01**](./01-setup/) | Setup | Install, authenticate, and verify GitHub Copilot CLI |
| [**02**](./02-guided-tour/) | Guided CLI Tour | Build and ship a standalone space quiz through an end-to-end CLI workflow |
| [**03**](./03-mona-mayhem/) | Get Started with Mona Mayhem | Clone the starter and engineer context with `/init`, slash commands, and shell commands |
| [**04**](./04-plan-and-scaffold/) | Plan & Scaffold | Design the API and page architecture before you implement |
| [**05**](./05-agent-mode/) | Build the Game | Wire up the battle page and contribution graphs with agentic help |
| [**06**](./06-design-vibes/) | Design-First Theming | Turn the scaffold into a retro arcade experience |
| [**07**](./07-polish/) | Polish & Parallel Work | Use multi-agent workflows to improve UX, resilience, and quality |
| [**08**](./08-agents/) | Specialized Agents & Instructions | Build custom agents and path-scoped instructions that carry your project's expertise |
| [**09**](./09-skills/) | Skills | Package reusable expertise Copilot loads automatically |
| [**10**](./10-mcp/) | MCP Servers | Connect Copilot to GitHub, a real browser, and live docs |
| [**11**](./11-bonus/) | Bonus & Extensions | Explore open-ended features, sharing workflows, and extra experiments |

---

## 💡 Pro Tips

1. **Keep the browser open** — watch live updates as you code.
2. **Commit often** — save clean checkpoints while you iterate.
3. **Refine the plan before implementation** — better plans lead to better results.
4. **Review Copilot's changes** — use the diff view or CLI review tools instead of accepting blindly.
5. **Keep Copilot in scope** — today's agents are eager and can build several parts at once. Each part is intentionally incremental. If Copilot jumps ahead (for example, fully theming the app while you're still scaffolding), undo and re-prompt with a tighter scope so each part lands as designed.




6. **Use `/session`, `/context`, and `/share file`** when you want to inspect or preserve your work.
