---
title: "Part 2: Guided CLI Tour"
---

Before starting Mona Mayhem, you'll take GitHub Copilot CLI through a complete workflow in a disposable `space-quiz` project. You'll build a site, iterate on it in a browser, publish it to GitHub, create issues, implement one in a worktree, and open a pull request.

## Create the project folder

Create an empty folder for the project:

```bash
mkdir space-quiz
```

Enter the new folder:

```bash
cd space-quiz
```

Start GitHub Copilot CLI inside that folder:

```bash
copilot
```

Confirm that you trust the empty folder. Use `/model` to select **GPT-5.3-Codex** if it is available; otherwise, select **Auto**. Then press <kbd>Shift</kbd>+<kbd>Tab</kbd> until the CLI is in **Interactive** mode rather than **Autopilot**.

> [!NOTE]
> The model picker controls which model answers; **Interactive** controls how independently the agent works. Use GPT-5.3-Codex when available, with Auto as the fallback, and keep the session in Interactive mode so you can review tool requests.

## Build the space quiz

Paste the same prompt used in the Copilot app tour:

```text
Create a space exploration quiz with 10 questions, a progress bar, score counter, and colorful animated feedback (green for correct, red shake for wrong). Show a results screen with emoji reaction at the end. Center in a narrow column. Single index.html, no server/dependencies. Polished, sans-serif, 14–16px body, prefers-color-scheme. Open in the integrated browser.
```

Copilot creates `index.html`. A terminal-only CLI does not have an integrated browser panel, so if it cannot open one, run the command for your platform directly from the interactive session:

| Platform | Command |
|----------|---------|
| Windows | `!Start-Process index.html` |
| macOS | `!open index.html` |
| Linux | `!xdg-open index.html` |

The `!` prefix runs a shell command without leaving the Copilot CLI session. Play through several questions and confirm the progress, score, correct feedback, and incorrect shake work.

## Iterate from what you see

Describe a visual element rather than editing the HTML yourself:

```text
Make the main heading feel more like a mission-control display. Keep it accessible and preserve the existing light and dark themes.
```

Refresh the browser after Copilot updates the file. Then try one or two follow-ups:

```text
Add a subtle star-field background that respects prefers-reduced-motion.
```

```text
Make the results screen more celebratory when the score is 8 or higher.
```

```text
Improve keyboard focus states and verify the quiz can be completed without a mouse.
```

Use `/diff` to review every change before continuing.

## Publish the project

Send:

```text
Initialize this folder as a Git repository, create an initial commit, and create a new public GitHub repository named space-quiz in my account. Push the current branch and set it as the default branch.
```

Review tool permission requests carefully. When Copilot finishes, follow the repository link and confirm `index.html` is on GitHub.

## Create three issues

Send:

```text
Review the space quiz and suggest three focused feature ideas that could each be completed in a short session. Create a separate GitHub issue for each idea with a clear title, user-focused description, and acceptance criteria. Do not implement them yet.
```

Ask Copilot to list the three issue URLs, read each issue, and choose one to implement.

## Implement an issue in a worktree

Replace `<ISSUE-NUMBER>` in this prompt:

```text
Create a new branch and git worktree for issue #<ISSUE-NUMBER>. In that worktree, implement the issue completely. Keep the single-file, dependency-free design, verify the behavior in a browser, and summarize the changes when finished.
```

When Copilot reports the worktree path:

1. Use `/cwd PATH` to switch the CLI session to that worktree.
2. Use `/diff` to inspect the implementation.
3. Open `index.html` with the platform command from earlier and test the feature.
4. Ask Copilot to commit the completed change.

## Open the pull request and handle review

Send:

```text
Push this branch and create a pull request that links the issue. Write a concise title and description with a summary and manual test steps.
```

Open the pull request URL on github.com and request **Copilot** from the **Reviewers** menu. After the review finishes, return to the CLI and ask:

```text
Read the Copilot review on this pull request. Fix up to two actionable comments, verify the affected behavior, push the changes, and summarize how each comment was addressed. Do not make changes for non-actionable comments.
```

Review the diff and the pull request before resolving the addressed conversations.

When you finish the tour, exit the interactive session:

```text
/exit
```

## Part 2 complete

You have used Copilot CLI to:

- create and visually iterate on a standalone app.
- run shell commands without leaving the interactive session.
- publish a repository and create three issues.
- implement an issue in an isolated worktree.
- open a pull request and respond to Copilot review feedback.

Next, you'll clone Mona Mayhem and engineer the repository context used by the remaining workshop. Continue to [Part 3: Get started with Mona Mayhem][next-part].

## Resources

- [Using GitHub Copilot CLI][using-cli]
- [Managing context in Copilot CLI][using-cli]
- [About Copilot code review][code-review]

[next-part]: ../03-mona-mayhem/
[using-cli]: https://docs.github.com/copilot/how-tos/copilot-cli/use-copilot-cli/overview
[code-review]: https://docs.github.com/copilot/concepts/code-review/code-review
