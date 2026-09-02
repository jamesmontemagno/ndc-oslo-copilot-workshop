---
title: "Prepare for the workshop"
description: "Install and verify the shared accounts and tools needed for the NDC Oslo GitHub Copilot workshop."
---

Complete this checklist before the workshop. Both labs work on Windows, macOS, or Linux.

## Accounts and access

- [ ] A personal GitHub account (preferred)
- [ ] GitHub Copilot Free or a paid Copilot plan
- [ ] Permission to create repositories and pull requests in your account
- [ ] Git configured with your GitHub identity

## Required tools

| Tool | Required for | Verify |
|---|---|---|
| [Git](https://git-scm.com/downloads) | Both labs | `git --version` |
| [Node.js 22 or 24](https://nodejs.org/) | Both labs | `node --version` |
| [Visual Studio Code 1.135 or later](https://code.visualstudio.com/) | VS Code lab | `code --version` |
| [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) | VS Code lab | Open Copilot Chat and select a Local session |
| [GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started) | Copilot App lab | Launch the app and confirm you are signed in |
| Edge or Chrome | Browser-based verification | Open the browser once |

## Sign in before arriving

1. Open VS Code, launch Copilot Chat, and confirm you are signed in to GitHub.
2. Launch the GitHub Copilot app and confirm it opens to your signed-in workspace.

## Clone the VS Code lab

The VS Code lab reads its guide and uses its runnable project directly from the source repository:

```console
git clone https://github.com/copilot-dev-days/agent-lab-typescript.git
cd agent-lab-typescript
code .
```

Install the recommended extensions when prompted. If you want to push your workshop changes, fork the repository first and clone your fork instead.

## Prepare for the Copilot App lab

You do not need to clone a project for this track. The guided tour creates a standalone `space-quiz` folder, and the following lesson guides you through creating Tailspin Toys from its GitHub template.

If your organization manages Copilot access, confirm that VS Code agent features and the GitHub Copilot app are enabled before the workshop. Contact your administrator or a facilitator if either sign-in is unavailable.

## Quick preflight

Before arriving, confirm:

1. `git`, `node`, and `code` return versions without errors.
2. The `agent-lab-typescript` repository opens in VS Code.
3. Copilot Chat opens with the **Local** session target.
4. The GitHub Copilot app launches and shows you as signed in.
5. You can create repositories and pull requests in your GitHub account.
6. Edge or Chrome opens normally.

When everything is ready, [begin with the VS Code lab](/labs/vscode/).
