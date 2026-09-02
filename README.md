# NDC Oslo × GitHub Copilot Workshop

Two hands-on GitHub Copilot labs for [NDC Oslo 2026](https://ndcoslo.com/) (14–18 September 2026, Oslo Spektrum) with Kayla Cinnamon and James Montemagno.

## Tracks

1. **VS Code** — Build an AI-first engineering workflow with local agents, skills, hooks, and browser tools.
2. **Copilot App** — Move from issue to implementation, review, testing, and merge using the GitHub Copilot app.

## Getting started

See the [preparation guide](src/content/docs/prepare.md) or the deployed site.

This repository contains only the workshop website and its NDC-specific integration. Runnable projects and canonical lesson content live separately:

- [VS Code GitHub Copilot Agent Lab](https://github.com/copilot-dev-days/agent-lab-typescript) for the VS Code track
- [Tailspin Toys](https://github.com/github-samples/tailspin-toys) for the Copilot App track

Lab Markdown is fetched from pinned upstream commits whenever the site runs or builds; generated pages are not committed here.
A daily GitHub Actions workflow checks for newer upstream commits, validates them, and opens or refreshes a pull request that updates the pins.

## Development

```bash
npm install
npm run dev
```

## Build and validate

```bash
npm run check
npm run build
```
