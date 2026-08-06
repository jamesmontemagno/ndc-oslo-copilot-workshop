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

## Get the project for each lab

This repository is the workshop website; runnable projects live separately. Get only the project for the lab you are starting:

| Lab | Open this project |
|---|---|
| Copilot App | Create a separate repository from the [Tailspin Toys template](https://github.com/github-samples/tailspin-toys), then open it in the Copilot app |
| Copilot CLI | `git clone https://github.com/jamesmontemagno/workshop-mona-mayhem.git`, then `cd workshop-mona-mayhem` and run `copilot` |

Tailspin Toys is intentionally separate because the Copilot App exercises use its repository-backed issues, branches, and pull requests. Its Lesson 0 walks you through creating that repository.

Direct cloning is enough for the local CLI exercises. Fork Mona Mayhem first when you want to push changes or use repository-backed GitHub features.

## Quick preflight

Before arriving, confirm:

1. `git`, `node`, and `copilot` return versions without errors.
2. You can authenticate with GitHub and Copilot.
3. You can access the separate Tailspin Toys template repository.
4. You can clone the [Mona Mayhem starter](https://github.com/jamesmontemagno/workshop-mona-mayhem).

When everything is ready, [begin with the Copilot App lab](/labs/copilot-app/).
