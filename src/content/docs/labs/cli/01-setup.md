---
title: "Part 1: Set Up GitHub Copilot CLI"
---

Start by installing GitHub Copilot CLI, signing in, and confirming that the command is ready. You won't clone the Mona Mayhem repository yet; first you'll verify the CLI independently.

## Step 1: Install GitHub Copilot CLI

Use the installation path that matches your machine:

- **npm (cross-platform, requires Node.js 22+)**

  ```bash
  npm install -g @github/copilot
  ```

- **Homebrew (macOS/Linux)**

  ```bash
  brew install --cask copilot-cli
  ```

- **WinGet (Windows)**

  ```powershell
  winget install GitHub.Copilot
  ```

If Copilot CLI is already installed, use the same command to update it.

## Step 2: Verify the installation

Open a new terminal and run:

```bash
copilot --version
```

If your terminal cannot find `copilot`, close and reopen the terminal so it reloads your `PATH`, then try again.

## Step 3: Start and authenticate

1. Start an interactive session:

   ```bash
   copilot
   ```

2. If prompted, confirm that you trust the current folder. Only trust folders whose contents you know are safe.
3. Enter:

   ```text
   /login
   ```

4. Follow the device flow in your browser to authenticate with GitHub.
5. Return to the terminal when authentication completes.

> [!NOTE]
> Copilot Business and Copilot Enterprise users need the Copilot CLI policy enabled by their administrator.

## Step 4: Confirm the CLI is ready

Inside the interactive session:

1. Run `/help` and confirm the command list appears.
2. Run `/model` and select **GPT-5.3-Codex** if it is available. If it is not listed, select **Auto**.
3. Run `/usage` to display the current session statistics.
4. Run `/exit` to leave the session.

## Part 1 complete

You have:

- installed or updated GitHub Copilot CLI.
- authenticated with GitHub.
- verified the CLI and slash commands, and selected GPT-5.3-Codex or the Auto fallback.

Next, you'll use a fresh folder to take a guided tour from prompt to pull request. Continue to [Part 2: Guided CLI tour][next-part].

## Resources

- [Installing GitHub Copilot CLI][install-cli]
- [Authenticating GitHub Copilot CLI][authenticate-cli]
- [Copilot CLI command reference][cli-reference]

[next-part]: ../02-guided-tour/
[install-cli]: https://docs.github.com/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli
[authenticate-cli]: https://docs.github.com/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli
[cli-reference]: https://docs.github.com/copilot/reference/copilot-cli-reference/cli-command-reference
