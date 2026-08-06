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
| [GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started) | Copilot App lab | Launch the app and confirm you are signed in |
| [GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli) | CLI lab | `copilot --version` |
| [Visual Studio Code](https://code.visualstudio.com/) | CLI lab | `code --version` |
| Edge or Chrome | Browser-based verification | Open the browser once |

## Sign in before arriving

1. Launch the GitHub Copilot app and confirm it opens to your signed-in workspace.
2. Authenticate the CLI:

   ```console
   copilot login
   ```

   Complete the browser device flow when prompted.

If your organization manages Copilot access, confirm that the GitHub Copilot app and Copilot CLI policies are enabled before the workshop. Contact your administrator or a facilitator if either sign-in is unavailable.

## Quick preflight

Before arriving, confirm:

1. `git`, `node`, `copilot`, and `code` return versions without errors.
2. The GitHub Copilot app launches and shows you as signed in.
3. Copilot CLI is authenticated.
4. You can create repositories and pull requests in your GitHub account.
5. Edge or Chrome opens normally.

When everything is ready, [begin with the Copilot App lab](/labs/copilot-app/).
