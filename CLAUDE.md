# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive LLM career roadmap web app ("Synthetic Lab") built with React + TypeScript + Vite. Displays a staged learning path for engineers transitioning into LLM/AI engineering, with curated resources (papers, repos, videos). Originally scaffolded for Google AI Studio deployment.

## Commands

- `npm run dev` — Start dev server on port 3000
- `npm run build` — Production build (output in `dist/`)
- `npm run lint` — Type-check with `tsc --noEmit` (no separate linter configured)
- `npm run preview` — Preview production build
- `npm run clean` — Remove `dist/`

## Architecture

Single-page React app with no routing. All source lives in `src/`.

- **`src/App.tsx`** — Entire UI: sidebar navigation, header, roadmap view, learning resources grid, and placeholder locked sections. All components are defined inline (no component directory).
- **`src/constants.ts`** — Roadmap data and TypeScript interfaces (`RoadmapStage`, `Resource`). This is the content source of truth — stages, modules, resources, and progress values are all defined here.
- **`src/index.css`** — Tailwind v4 theme configuration using `@theme` directive. Defines a dark color system (background, surface variants, primary/secondary/tertiary) and custom fonts (Inter, Space Grotesk, JetBrains Mono).
- **`src/lib/utils.ts`** — Single `cn()` utility combining `clsx` + `tailwind-merge`.

## Key Technical Details

- **Tailwind CSS v4** with `@tailwindcss/vite` plugin — uses the new `@theme` directive, not `tailwind.config.js`
- **Framer Motion** imported as `motion/react` (not `framer-motion`)
- **Path alias**: `@` maps to project root (not `src/`)
- **Environment**: `GEMINI_API_KEY` is injected via Vite's `define` in `vite.config.ts` (loaded from `.env.local`). Currently unused in code but wired up for future AI features.
- **No test framework** is configured
- **No backend** — purely client-side; Express is a dependency but unused
