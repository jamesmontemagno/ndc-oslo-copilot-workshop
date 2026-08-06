---
title: "Prepare for the workshop"
description: "Install and verify everything needed for the two NDC Oslo GitHub Copilot labs."
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
| [GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli) | CLI lab | `copilot --version` |
| [Visual Studio Code](https://code.visualstudio.com/) | CLI lab | `code --version` |
| Edge or Chrome | Browser-based verification | Open the browser once |

## Verify Copilot CLI

```console
copilot --version
copilot login
```

Complete the browser authentication flow. If your organization restricts Copilot, use a personal GitHub account with Copilot access for the workshop.

## Step 0: Fork or clone the workshop

Do this once before starting the labs. **Forking is recommended** because it gives you a repository where you can push changes, create pull requests, and use cloud agents.

1. Open the [workshop repository](https://github.com/jamesmontemagno/ndc-oslo-copilot-workshop).
2. Select **Fork**, then create the fork in your personal GitHub account.
3. Clone your fork and enter the workshop folder:

   ```bash
   git clone https://github.com/YOUR-GITHUB-HANDLE/ndc-oslo-copilot-workshop.git
   cd ndc-oslo-copilot-workshop
   ```

If you only want to work locally, clone the source repository directly instead:

```bash
git clone https://github.com/jamesmontemagno/ndc-oslo-copilot-workshop.git
cd ndc-oslo-copilot-workshop
```

The CLI starter project is included under `labs/`:

```text
labs/
└── 01-copilot-cli/
```

The Copilot App lab uses the separate [Tailspin Toys template](https://github.com/github-samples/tailspin-toys). Its Lesson 0 walks you through creating your own repository from that template.

## Open the project for each lab

Start each lab from the cloned workshop folder:

| Lab | Open this project |
|---|---|
| Copilot App | Create a separate repository from the [Tailspin Toys template](https://github.com/github-samples/tailspin-toys), then open it in the Copilot app |
| Copilot CLI | Open a terminal in `labs/01-copilot-cli` and run `copilot` |

Tailspin Toys is intentionally separate because the Copilot App exercises use its repository-backed issues, branches, and pull requests. Its Lesson 0 walks you through creating that repository.

## Quick preflight

Before arriving, confirm:

1. `git`, `node`, and `copilot` return versions without errors.
2. You can authenticate with GitHub and Copilot.
3. You cloned the workshop repository and can find the CLI starter folder.
4. You can access the separate Tailspin Toys template repository.

When everything is ready, [begin with the Copilot App lab](/labs/copilot-app/).
