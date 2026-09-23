---
title: "The Editor's Evolution: TomaNote v0.5.6 and v0.5.7"
description: "From a flat textarea to a WYSIWYG editor with Milkdown and ProseMirror: how Markdown evolved in TomaNote, with more precision, performance and privacy."
publishDate: "2026-09-21"
updatedDate: "2026-09-21"
author: "camiicode"
tags: ["open-source", "product-update", "markdown", "dev-journal", "tech-stack"]
featured: true
draft: false
ogImage: "/images/blog/v057-editor-evolution/hero.png"
i18nSlug: v057-editor-evolution
---

<br/>

# The Editor's Evolution: TomaNote v0.5.6 and v0.5.7 🚀

Some versions fix things. Others redefine what the tool can be. **TomaNote v0.5.6** (released September 4) and **v0.5.7** (September 21) undoubtedly belong to the second category.

During this release cycle, TomaNote's editor went from a plain HTML `textarea` to a full **WYSIWYG** Markdown writing experience: live formatting, highlighted code blocks, smart pasting, and an interface that adapts to your screen instead of fighting it.

This article is the chronicle of that evolution: what changed, why we did it this way, and what it means for your writing flow.

## The starting point: honesty first

To understand the leap, you need to remember where we came from.

The original workspace was a `<textarea>` embedded in flat HTML. It worked. You typed, it saved, period. But if you wanted **bold text**, you had to type `**bold**` and trust your memory to know how it would look. No preview, no visual formatting, no guidance.

True to the project's minimalist philosophy, the answer wasn't to pile on features: it was to **rebuild the foundation**.

## The new foundation: Milkdown + ProseMirror

**v0.5.6** completely replaced the legacy `contenteditable` system with [Milkdown](https://milkdown.dev/), a Markdown editor built on top of [ProseMirror](https://prosemirror.net/).

Why this combination?

* **Real WYSIWYG**: you write Markdown, you see rich formatting. What you read is what you get — no alternate modes, no separate preview panes.
* **Pure Markdown underneath**: the document serializes to real Markdown, no proprietary wrappers or closed formats. Your notes remain yours, in plain text.
* **Plugin-based architecture**: every capability (history, syntax highlighting, custom marks) is an independent module that composes cleanly.

The integration wasn't trivial. We removed the `marked` dependency —absorbed by Milkdown— and evaluated [Shiki](https://shiki.style/) for syntax highlighting, but dropped it: its async timing clashed with ProseMirror's synchronous transactional model. Instead, code blocks now feature **language labels, line numbers, and colors matched to the active theme**.

One robustness detail we're proud of: we fixed a *key mismatch* in ProseMirror's schema context that crashed editor creation. It's the kind of invisible bug that decides whether a migration feels solid or fragile.

## Frictionless formatting

The new editor shipped with a **right sidebar packing 12 formatting buttons**: bold, italic, underline, headings, code, blockquotes, lists, and links. Plus the shortcuts you already know:

* `Ctrl+B` / `Ctrl+I` / `Ctrl+U` for inline formatting.
* `Ctrl+Z` / `Ctrl+Y` for undo and redo.
* `Ctrl+S` for instant save confirmation.

And a custom **auto empty lines plugin** that positions the cursor correctly around code blocks and quotes — a small detail you notice in every paragraph you write.

## Markdown with surgical precision

Here comes one of the most requested improvements: **pasting from AI tools without dragging formatting garbage along**.

If you've ever copied a Google Gemini (or ChatGPT, or any assistant) answer and pasted it into an editor, you know the drama: nested spans, inline styles, broken lists, invisible artifacts that break your document.

TomaNote now runs **background clipboard sanitization**: when you paste rich-formatted content, it gets processed and normalized into clean Markdown before it ever touches your note. Copy from Gemini, paste into TomaNote, and the result is whole, structured Markdown. No manual cleanup. No surprises.

> Writing with AI is already part of the daily workflow. Having your editor respect that flow —instead of breaking it— is the difference between a tool and a friction.

## Goodbye, `prompt()`: real modals

**v0.5.7** focused on polishing the experience down to the last detail.

One of the most visible changes: links are no longer inserted through the browser's native `prompt()`, that generic gray window that felt foreign to the app's design. There's now a **custom TomaNote modal** for link insertion, coherent with the design system, keyboard-accessible and consistent across all themes.

But inserting the link was only half the problem. What happens when you click one? Before, nothing did. Now:

* **Ctrl/Cmd + click** opens the link in a new tab.
* Links inserted without a prior selection **render as real `<a>` elements**, with their mark intact — a subtle `inheritMarks` fix that keeps links from dying at birth.

## The Adobe-style flow: the sidebar that adapts

Another fix that sounds minor until you live it: on short screens (laptops, split-window mode, tablets in landscape), the right sidebar's tools would get **clipped buttons** or fall back to an uninspired vertical scrollbar.

The solution took inspiration from how Adobe tool palettes behave: below a **900px viewport height**, the tools **flow into adaptive vertical multi-columns**. Nothing gets clipped. Nothing hides behind a scrollbar. Everything you need stays visible, smartly reorganized.

It's a CSS and layout change, sure. But it embodies the project's philosophy: **the interface adapts to you, not the other way around**.

## Under the hood: performance and radical privacy

While the polish was visible, the architecture did quiet work:

* **5000ms save debounce**: every keystroke doesn't trigger a save cycle. The system batches activity and persists when you pause, saving unnecessary `localStorage` writes and keeping the interface fluid even with long notes. Even the "Saved" indicator respects the debounce — because announcing a save before it happens would be lying to the user.
* **100% serverless**: TomaNote has no backend. Your notes live in your browser, via `localStorage`. Zero telemetry, zero accounts, zero servers that could leak or resell your notes.
* **Shortcut deduplication**: keyboard shortcuts that intermittently failed now re-register cleanly, eliminating the duplicate `keydown` handlers that caused erratic behavior.

And as every good open source release does, test coverage grew with the code: **867 tests in total** — 725 unit (Vitest) and 142 E2E (Playwright), including new suites for save debouncing, tab pinning, and the responsive sidebar.

## What we're taking away from this cycle

1. **Rebuilding the foundation is worth it.** The Milkdown/ProseMirror migration hurt more than polishing details, but every later improvement was built on top of it.
2. **Details are the feature.** A link modal, a respected debounce, a flowing column: none of these show up in the README, but all of them define how the app feels.
3. **Privacy isn't a feature, it's an architecture decision.** Being serverless wasn't a constraint; it's what makes it possible to promise your notes never leave your device.

## Try it yourself

TomaNote v0.5.7 is available now at [tomanote.app](https://tomanote.app). It's free, open source, and works offline after the first load.

Open a note, paste an answer from your favorite AI assistant, and watch it become clean, formatted Markdown that's yours.

See you in the next cycle.

---

**Explore TomaNote:** [tomanote.app](https://tomanote.app)

**Follow the project on GitHub:** [TomaNote/TomaNote](https://github.com/Tomanote/TomaNote)
