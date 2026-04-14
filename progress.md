# Synthetic Lab — Improvement Progress

Trackable improvement roadmap for the Awesome LLM Career Path project.

---

## 1. Architecture & Code Quality

- [ ] **Split monolithic App.tsx** (~790 lines) into individual component files under `src/components/`
  - [ ] Extract `Sidebar` + `SidebarItem`
  - [ ] Extract `StageCard`
  - [ ] Extract `ResourceCard` + `ResourceIcon`
  - [ ] Extract `AIAssistantPanel`
  - [ ] Extract `ProjectCard` + `DifficultyBadge`
  - [ ] Extract `DashboardStats` (bento grid, progress cards)
  - [ ] Extract `SearchBar`
- [ ] **Create custom hooks** under `src/hooks/`
  - [ ] `useSearch` — debounced search logic with filtered results
  - [ ] `useAIAssistant` — Gemini API interaction, loading state, error handling
  - [ ] `useProgress` — stage progress tracking with localStorage persistence
- [ ] **Fix type safety issues**
  - [ ] Replace `icon: any` in SidebarItem with `React.ComponentType<LucideProps>`
  - [ ] Create discriminated union type for tab state instead of raw strings
  - [ ] Add proper return types to all component functions
- [ ] **Remove unused code and dependencies**
  - [ ] Remove `express` from package.json (unused)
  - [ ] Remove unused `allResources` computation (App.tsx ~line 323-326)
  - [ ] Audit and remove any other dead code
- [ ] **Add error boundary** — wrap root app in an ErrorBoundary component with fallback UI

---

## 2. Features

### Progress & Persistence
- [ ] **Save user progress to localStorage** — persist completed modules, current stage, resource bookmarks
- [ ] **Implement stage unlock logic** — auto-unlock Stage 3 when Stage 2 reaches 100%, etc.
- [ ] **Add module completion checkboxes** — let users mark individual modules as done
- [ ] **Calculate overall progress dynamically** from actual completion data (currently hardcoded 62%)

### Resource Management
- [ ] **Bookmark / favorites system** — save resources to a personal reading list
- [ ] **Sort resources** by type, difficulty, or date added
- [ ] **Pagination or infinite scroll** for the 35+ resource list
- [ ] **"Mark as read"** toggle on individual resources

### AI Assistant
- [ ] **Conversation history** — persist chat messages across tab switches
- [ ] **Streaming responses** — show Gemini output as it arrives instead of waiting for full response
- [ ] **Follow-up context** — send prior messages as context for multi-turn conversations
- [ ] **Suggested prompts** — show starter questions relevant to current stage/module

### Search
- [ ] **Debounce search input** (300ms) to reduce re-renders on every keystroke
- [ ] **Search suggestions / autocomplete** based on module and resource titles
- [ ] **"No results" state** with helpful suggestions (e.g. "Try searching for 'transformer'")

---

## 3. Performance

- [ ] **Memoize expensive components** — wrap `ResourceCard`, `StageCard`, `ProjectCard` with `React.memo`
- [ ] **Lazy load images** — add `loading="lazy"` to external images (picsum.photos avatar, etc.)
- [ ] **Virtual scrolling** for resource list (use `react-window` or `@tanstack/virtual`) if list grows beyond 50+
- [ ] **Code-split AI assistant** — dynamic import `react-markdown` and Gemini logic only when AI panel opens
- [ ] **Fix useMemo dependencies** — ensure `filteredRoadmapData` and resource filters have correct dep arrays
- [ ] **Replace external avatar** with local placeholder to avoid unnecessary network request

---

## 4. Accessibility (a11y)

- [ ] **Add visible focus indicators** on all interactive elements (sidebar items, tabs, buttons, cards)
- [ ] **Add `aria-label`** to icon-only buttons (notification bell, bolt icon, search clear)
- [ ] **Respect `prefers-reduced-motion`** — disable Framer Motion entrance animations when user prefers reduced motion
- [ ] **Add skip navigation link** — "Skip to main content" for keyboard users
- [ ] **Keyboard navigation** — ensure all tabs, filters, and cards are reachable via Tab/Enter/Space
- [ ] **Add `aria-current="page"`** on the active sidebar tab
- [ ] **Label locked sections** — announce "Strategy section is locked" via `aria-disabled` or `aria-label`
- [ ] **Improve color contrast** for tertiary text (currently ~4.5:1, push to 7:1 for AAA)

---

## 5. Testing

- [ ] **Set up Vitest** with React Testing Library
  - [ ] Add `vitest`, `@testing-library/react`, `@testing-library/jest-dom` as dev dependencies
  - [ ] Configure `vitest.config.ts` extending Vite config
  - [ ] Add `npm run test` script to package.json
- [ ] **Unit tests for core components**
  - [ ] `StageCard` — renders correct status, progress bar, module count
  - [ ] `ResourceCard` — renders link, type icon, correct badge
  - [ ] `SearchBar` — filters results, clears input
  - [ ] `DifficultyBadge` — correct color per difficulty level
- [ ] **Integration tests**
  - [ ] Tab navigation switches content correctly
  - [ ] Search filters roadmap and resources
  - [ ] Resource type filter toggles work
- [ ] **Add CI test step** (GitHub Actions or similar)

---

## 6. UI / UX

### Mobile Responsiveness
- [ ] **Collapsible sidebar** — hamburger menu on small screens instead of fixed 64px sidebar
- [ ] **Responsive search bar** — scale appropriately on mobile
- [ ] **Touch-friendly tap targets** — ensure buttons are at least 44x44px on mobile
- [ ] **Test and fix grid layouts** at 320px, 375px, 768px breakpoints

### Empty & Loading States
- [ ] **Loading skeleton** for AI assistant responses
- [ ] **Better "Section Restricted" UI** — explain what's needed to unlock, show preview
- [ ] **Empty search state** with illustration and suggestions
- [ ] **Loading state for initial render** (splash or skeleton)

### Navigation
- [ ] **Breadcrumbs** showing current location (e.g. Roadmap > Stage 2 > Module 3)
- [ ] **Active resource indicator** — highlight which resource is currently being viewed
- [ ] **Back-to-top button** on long scrollable sections

### Visual Polish
- [ ] **Dark/light mode toggle** (currently dark-only)
- [ ] **Consistent card hover effects** across all sections
- [ ] **Animated progress ring** for overall completion (instead of static number)

---

## 7. DevOps & Production Readiness

- [ ] **SEO meta tags** — add title, description, Open Graph tags to `index.html`
- [ ] **Add favicon** and app icons
- [ ] **PWA manifest** — `manifest.json` with app name, icons, theme color for installability
- [ ] **Service worker** for offline caching of static assets
- [ ] **Security headers** — Content-Security-Policy, X-Frame-Options (via Vite plugin or deploy config)
- [ ] **Error logging** — integrate a lightweight error tracker (e.g. Sentry) or console reporter
- [ ] **GitHub Actions CI** — lint, type-check, test on every PR
- [ ] **Lighthouse audit** — achieve 90+ on Performance, Accessibility, Best Practices, SEO
- [ ] **Bundle analysis** — add `rollup-plugin-visualizer` to understand and optimize bundle size

---

## 8. Content & Learning Experience

- [ ] **Add more resources** per module — aim for 5-8 per module (currently 3-5)
- [ ] **Resource difficulty tags** — label each resource as beginner / intermediate / advanced
- [ ] **Estimated reading/watch time** on each resource
- [ ] **Learning assessments** — simple quizzes or reflection prompts per module
- [ ] **Prerequisite mapping** — show which modules depend on others
- [ ] **Community links** — add Discord/Slack channels, study groups, relevant subreddits
- [ ] **Changelog** — track when new resources or stages are added
- [ ] **Contribution guide** — let others submit resources via PR template

---

## Priority Guide

| Priority | Category | Impact |
|----------|----------|--------|
| High | Architecture (split App.tsx) | Unlocks all other improvements |
| High | Progress persistence | Core UX — users lose state on refresh |
| High | Accessibility | Inclusivity and compliance |
| Medium | Testing setup | Confidence for future changes |
| Medium | Mobile responsiveness | Broader audience reach |
| Medium | AI assistant improvements | Key differentiator feature |
| Low | PWA / offline | Nice-to-have for later |
| Low | Dark/light toggle | Cosmetic, current dark theme works well |
| Low | Community features | Requires backend infrastructure |
