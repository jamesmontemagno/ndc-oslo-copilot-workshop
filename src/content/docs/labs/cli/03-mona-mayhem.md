---
title: "Part 3: Get Started with Mona Mayhem"
---

Now you'll move into the repository used for the rest of the CLI workshop. You'll clone Mona Mayhem, run it locally, generate repository instructions with `/init`, inspect the active context, and practice both interactive and one-shot CLI commands.

## Clone the Mona Mayhem starter

If the `space-quiz` session is still open, exit it:

```text
/exit
```

Move up one folder so Mona Mayhem is created next to `space-quiz`:

```bash
cd ..
```

Clone the starter:

```bash
git clone https://github.com/jamesmontemagno/workshop-mona-mayhem.git
```

Enter the cloned repository:

```bash
cd workshop-mona-mayhem
```

Keep all remaining CLI lab work in this repository. Fork the starter first only if you want to push changes or use repository-backed GitHub features.

Start Copilot CLI from the `workshop-mona-mayhem` folder:

```bash
copilot
```

Confirm that you trust the repository after reviewing its source.

Use `/model` and select **GPT-5.3-Codex** if it is available. If it is not listed, select **Auto**.

Before running `/init` or any other project command, ask Copilot to confirm its working directory:

```text
What exact folder am I in right now? Return the full path and the folder name.
```

Confirm the response ends in `workshop-mona-mayhem`. If it does not, exit Copilot CLI, use `cd` to enter the cloned repository, and start `copilot` again.

## Install and run the project from Copilot CLI

Prefixing input with `!` runs a shell command directly without sending it to the model.

Install the project dependencies:

```text
!npm install
```

Start the development server:

```text
!npm run dev
```

Open `http://localhost:4321` and confirm Mona Mayhem loads. Because the development server is a long-running command, it occupies the interactive terminal while it runs. Return to the terminal and press <kbd>Ctrl</kbd>+<kbd>C</kbd> after checking the page so you can continue the Copilot CLI session.

## Generate repository instructions with `/init`

Context engineering gives Copilot durable information about the codebase. Enter:

```text
/init simple instructions with a project overview, build/dev commands, and Astro best practices, (ignore the workshop).
```

Copilot analyzes the repository and creates `.github/copilot-instructions.md`.

1. Read the generated instructions.
2. Remove anything inaccurate or overly broad.
3. Run `/instructions` and confirm the repository instructions are loaded.
4. Use `/diff` to review the new file.
5. Commit the instructions file.

> [!TIP]
> Keep repository instructions concise and factual. They are added to future prompts automatically, so irrelevant guidance consumes context every time.

## Inspect and manage context

Run these slash commands:

1. `/help` to scan the available commands.
2. `/context` to see what currently occupies the context window.
3. `/model` to inspect or change the active model.
4. `/usage` to review session duration, model usage, and edited lines.
5. `/instructions` to list the instruction files Copilot loaded.

If your session becomes crowded later, `/compact` compresses the conversation history. `/add-dir PATH` grants access to another trusted directory when a task legitimately spans folders.

## Run shell commands inside Copilot CLI

You already used `!` to install and run the project. Try a few more direct shell commands:

```text
!git status --short
```

```text
!npm run
```

```text
!git log -1 --oneline
```

Use this for commands you already know. Ask Copilot for help when you need it to choose, explain, or interpret a command.

## Explore Mona Mayhem with context

Try these prompts:

```text
Give me an overview of this project, including its current state and the main files we will need to complete.
```

```text
@src/pages/api/contributions/[username].ts What is this file for and what still needs to be built here?
```

```text
@src/pages/index.astro What exists here and what would I need to add to build the battle page?
```

The `@` references explicitly add a file to the prompt context. Compare those focused answers with the broader repository overview.

## Run a one-shot prompt

Exit the interactive session with `/exit`, then run:

```bash
copilot -p "Summarize the architecture of this repo in 5 bullet points"
```

The `-p` option is useful for quick answers and scripts that do not need a continuing interactive conversation. Start `copilot` again when you are ready for the next lesson.

## Check your understanding

When should you use a path-specific instruction file instead of `.github/copilot-instructions.md`?

<details>
<summary>Check your answer</summary>

Use `.github/copilot-instructions.md` for project-wide rules that should shape every request, such as build commands and repository conventions. Use a file under `.github/instructions/` with an `applyTo` glob when guidance only matters for certain paths or file types. Keeping specialized rules scoped avoids loading irrelevant context into every conversation.

**Go deeper:** [Add custom instructions for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions).

</details>

## Part 3 complete

You have:

- cloned and run Mona Mayhem.
- generated and reviewed repository instructions with `/init`.
- inspected the session's instructions, usage, and context.
- run shell commands inside the interactive CLI.
- used file references and a one-shot prompt.

Next, you'll plan the API and page scaffold before implementation. Continue to [Part 4: Plan and scaffold][next-part].

[next-part]: ../04-plan-and-scaffold/
