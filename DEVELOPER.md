# Developer Guidelines & Project Architecture

This document provides guidelines, technical design principles, and patterns for future human developers and AIs working on this codebase. Maintaining the quality of semantic HTML, accessibility (a11y), clean styling, and concise reactive state is a key priority.

---

## Core Technical Stack

- **Framework:** Vue 3 (Composition API with `<script setup lang="ts">`)
- **State Management:** Pinia (TypeScript stores)
- **Routing:** Vue Router 4 (with scroll position saving and scroll spy capabilities)
- **Styling:** Sass (SCSS) with global layout rules, responsive design, custom print stylesheets, and dark mode support
- **Build System:** Vite (TypeScript, PostCSS)

---

## 🏗️ Architectural Design & Data Flow

```
                  ┌───────────────────┐
                  │ src/data/         │
                  │   ├─ resume.json  │
                  │   └─ projects.json│
                  └─────────┬─────────┘
                            │ (Merges resume.json and projects.json
                            ▼  properties dynamically at startup)
                    ┌───────────────┐
                    │  Pinia Store  │
                    │ (src/store.ts)│
                    └───────┬───────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
      ┌───────────┐   ┌───────────┐   ┌───────────┐
      │  Home.vue │   │Project.vue│   │SeoMeta.vue│
      └───────────┘   └───────────┘   └───────────┘
```

### 1. Data Store & Merging logic (`src/store.ts`)
The resume data complies with standard formats but splits generic biographical/experience info (`resume.json`) from project portfolio asset data (`projects.json`).
- At runtime, Pinia merges matching project keys via the `associatedResumeProject` parameter.
- Unmatched portfolio projects (e.g., smaller side projects) are appended to the list dynamically.
- Always use `useResumeStore()` to query project listings (`store.projects` getter) or find a specific project detail page (`store.findProjectById(id)`).
- Avoid caching local duplicate state in individual Vue components. Always rely on computed getters or store state to keep the source of truth unified.

### 2. Scroll Management & URL Hash Restoration (`src/composables/use-scroll-spy.ts`)
To prevent visual jumpiness when navigating between the **Home** (multisection resume list) and **Project** detail pages, we implement a custom ScrollSpy mechanism:
- When clicking a router link to a detailed project view, the router saves the current `window.scrollY` position using `store.saveScrollPosition`.
- When returning back to Home from a project page, `useScrollSpy` instantly restores the pixel-accurate scroll position so the user doesn't lose context.
- Smooth-scrolling links are intercepted and handled via a programmatic `scrollIntoView({ behavior: 'smooth' })` helper. This handles focus-shifting to the target sections for superior keyboard accessibility.

---

## ♿ Accessibility & Semantic HTML Guidelines

We design for everyone, including keyboard users, screen-readers, and assistive technologies. When writing or refactoring templates, satisfy the following criteria:

### 1. Structure & Landmarks
- **Layout Landmarks:** Use `<header>`, `<nav>`, `<main>`, and `<footer>` elements properly. Every page template must nest main contents inside the `<main>` block with a matching `id="main-content"` target.
- **Skip Navigation:** The layout includes a skip link (`<a href="#main-content" class="skip-link sr-only">Skip to main content</a>`) to let screen-readers and keyboard navigators bypass headers. Keep this functional.
- **Heading Hierarchy:** Each page/layout must establish a logical heading order (e.g., `<h1>` for page title, `<h2>` for section boundaries, `<h3>` for individual items).

### 2. Focus Management
- When scrolling programmatically to sections via anchor links (e.g., clicking *Experience* or *Skills* in navigation), we set focus directly onto the target element:
  ```ts
  targetEl.focus({ preventScroll: true })
  ```
  This is why sections have `tabindex="-1"` and `outline: none` styles. Doing this ensures screen-reader focus moves along with the viewport.

### 3. Screen Reader Utilities (`sr-only`)
- For external links that open in a new browser tab, use the reusable `<external-a href="...">` component instead of manual `<a>` tags. It automatically appends the correct `target="_blank"`, `rel="noopener noreferrer"`, and screen-reader accessible warning text:
  ```html
  <external-a href="...">Link Text</external-a>
  ```
- Use `aria-label` on custom controls, video views, or descriptive figures that do not have visible caption text.

---

## ✍️ Code Style & Quality Standards

### 1. Concision over Complexity (DRY)
- **Format Dates & Ranges:** Do not repeat date parsing or rendering blocks in different elements. Use the reusable `<date-range :start-date="..." :end-date="..." />` component.
- **External Links:** Always use the `<external-a href="...">` component for links that open in a new window/tab to guarantee uniform a11y compliance.
- **Derived Computations:** Prefer `computed()` properties over manual watchers (`watch()`) or lifecycle Hooks (`onMounted`) to format data structure.

### 2. Responsive Styling & Dark Mode
- Use CSS viewport-relative media-queries instead of JS event listeners (`window.addEventListener('resize')`) to build layout breakpoints. This reduces JS execution overhead.
- Support **Dark Mode** seamlessly via the CSS media query `(prefers-color-scheme: dark)`. Avoid complex dark mode state machines in store variables unless specifically requested.
- Keep print styling separated in `@/assets/styles/_print.scss` and test print previews to ensure elements hide or restructure cleanly.

### 3. TypeScript Guidelines
- All store and data properties must define robust interfaces (e.g., `@/types/resume.ts`). Avoid using `any` type annotations where possible.
