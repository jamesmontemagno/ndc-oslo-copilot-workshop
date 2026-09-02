# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers attending NDC Oslo 2026 with Kayla Cinnamon and James Montemagno. They use laptops in an instructor-led workshop, move between guided and self-paced exercises, and may return later to resume. The workshop supports Windows, macOS, and Linux.

## Product Purpose

Provide one trusted path through two GitHub Copilot experiences, ordered as VS Code and Copilot App. Success means attendees can prepare once, start the correct project, complete each lesson in sequence, and resume without searching across separate repositories.

## Positioning

The site joins a VS Code agent lab with a repository-backed Copilot App development loop while keeping each track's setup model explicit: attendees clone the complete `agent-lab-typescript` repository for VS Code and create Tailspin Toys from an external template for the Copilot App.

## Operating Context

Attendees use GitHub, Git, Node.js, a modern browser, Visual Studio Code, and the GitHub Copilot app. The published site runs on GitHub Pages at `/ndc-oslo-copilot-workshop/`.

## Capabilities and Constraints

- Retain only the VS Code and Copilot App tracks, in that order.
- Preserve substantive upstream lesson content and provenance.
- Keep runnable workshop projects out of this website repository.
- Direct learners to the complete VS Code lab repository and the Tailspin Toys template.
- Import pinned upstream lesson Markdown at run and build time instead of committing generated pages.
- Store progress and theme preferences locally in the browser.
- Support dynamic GitHub Pages owner and repository paths.

## Brand Commitments

Use the name NDC Oslo 2026 and the official public event facts: 14-18 September 2026 at Oslo Spektrum. Link to <https://ndcoslo.com/>. Credit Kayla Cinnamon and James Montemagno. Use an original NDC Oslo-inspired identity without copying official site code, protected logo artwork, or non-redistributable fonts or assets.

## Evidence on Hand

- Retained source workshop lessons in the local read-only source repository.
- Official event metadata at <https://ndcoslo.com/>.
- Upstream source pins in `workshops.sources.json`.
- No workshop-specific NDC date or session URL is confirmed and none may be invented.

## Product Principles

1. Make the two-track progression unmistakable on every surface.
2. Start with VS Code and make resume behavior predictable.
3. Make each track's external project setup unmistakable.
4. Preserve educational source truth while removing unrelated curriculum completely.
5. Optimize for legibility, keyboard access, and confidence in a conference room.

## Accessibility & Inclusion

Target WCAG 2.2 AA. Support complete keyboard navigation, visible focus, high-contrast light and dark themes, semantic landmarks and headings, 320px-wide screens, browser zoom, reduced motion, and accessible progress announcements.
