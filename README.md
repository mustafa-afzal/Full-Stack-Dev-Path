# Full Stack Developer Path

My work through [Scrimba's Full Stack Developer Career Path](https://scrimba.com/fullstack-path-c0fullstack) — 30 projects taking me from static HTML/CSS pages to full stack applications with real databases, authentication, and AI integrations.

This repo is the full record, but the sections below cover the projects that actually mattered and the skills they built.

## Core Stack

| Area | Tech |
|------|------|
| **Frontend** | React 19, Next.js 15 (App Router), TypeScript, React Router v6/v7, Tailwind CSS v4 |
| **Backend** | Node.js, Express, REST API design, MVC architecture |
| **Data** | SQLite, Supabase (Postgres), pgvector, SQL (parameterized queries, filtering, pagination) |
| **Auth** | Session-based auth with `express-session` + bcrypt, Supabase Auth, protected routes |
| **AI** | OpenAI & Anthropic SDKs, embeddings, vector similarity search (RAG), server-side API proxying |
| **Tooling** | Vite, ESLint, npm, Git, environment/secret management |

---

## Featured Projects

### [PrintForge](./printforge-app) — Next.js 15 + TypeScript + SQLite

A 3D model marketplace built from a static HTML mockup into a full server-rendered application.

- **React Server Components** fetch data directly in `async` page components, with client components (`'use client'`) only where interactivity is actually needed
- **File-based routing** across nested layouts and dynamic segments — `/3d-models/[id]` and `/3d-models/categories/[categorySlug]` — with co-located `loading.tsx` for streamed skeletons and per-route `not-found.tsx` triggered by `notFound()`
- **URL as state**: search, sorting, and pagination all live in `searchParams`, so every view is shareable and back-button friendly; out-of-range pages `redirect()` server-side
- `useTransition` + `next/form` for non-blocking navigation with pending UI instead of layout-shifting spinners
- A typed SQLite data layer ([lib/models.ts](./printforge-app/lib/models.ts)) that composes `WHERE` / `ORDER BY` / `LIMIT OFFSET` clauses dynamically with **parameterized placeholders** — no string interpolation into SQL
- Next 15 async `params`/`searchParams`, plus `next/image` and `next/font` optimization
- Seed scripts run via `tsx` so the database rebuilds from JSON on `npm run dev`

**Skills:** Next.js App Router, server vs. client component boundaries, TypeScript, SQL query building, Tailwind v4.

---

### [Spiral Sounds](./express-fullstack-app) — Express REST API with Session Auth

A vinyl record store with a real backend: full MVC structure, user accounts, and a persisted cart.

- Layered architecture — [routes/](./express-fullstack-app/routes), [controllers/](./express-fullstack-app/controllers), [middleware/](./express-fullstack-app/middleware), [db/](./express-fullstack-app/db) — instead of one monolithic `server.js`
- **Password hashing with bcrypt**, session cookies via `express-session`, and a `requireAuth` middleware guarding protected routes
- Server-side input validation (email format, username rules, uniqueness checks) returning proper HTTP status codes
- Vanilla-JS frontend split into a service layer (`productService`, `cartService`) and a UI layer — the same separation of concerns React enforces, done by hand

**Skills:** REST API design, authentication and password security, middleware, MVC, HTTP semantics.

---

### [Sales Dashboard](./sales-dashboard) — React + Supabase Auth

An analytics dashboard behind a login wall, backed by Supabase.

- Global auth state via **React Context** with an `onAuthStateChange` subscription, so sign-in/sign-out propagates everywhere instantly
- A `<ProtectedRoute>` wrapper plus a root redirect route — unauthenticated users never reach the dashboard
- Sign-up / sign-in flows against Supabase Auth, with profile data pulled from a Postgres table
- Data visualization with `react-charts`

**Skills:** Context API, auth flows, route protection, BaaS/Postgres, React Router v7.

---

### [VanLife](./vanlife-app) — React Router SPA

A van rental marketplace, and the deepest routing project in the path.

- **Nested routes with shared layouts** (`Layout` → `HostLayout` → van detail → info/pricing/photos tabs) using `<Outlet />`
- Dynamic route params, index routes, relative links, and a catch-all 404
- Search-param filtering that survives navigating into a detail page and back
- **MirageJS** mock server, so the frontend was built against a realistic API before any backend existed

**Skills:** Client-side routing architecture, layout composition, API mocking.

---

### [Assembly: Endgame](./typed-assembly-endgame) — JavaScript → TypeScript Migration

A word game rewritten from a single 200-line `App.jsx` into a typed, component-driven app. The original is kept alongside in [AE_ORIGINAL/](./typed-assembly-endgame/AE_ORIGINAL) for comparison.

- Full **TypeScript** conversion: typed props, state, and utility signatures
- Decomposed into nine focused components, with derived state replacing redundant `useState`
- **Accessibility** done properly — an `aria-live` status region announcing game state to screen readers, semantic keyboard buttons with `aria-label`

**Skills:** TypeScript in React, refactoring, component decomposition, a11y.

---

### [Movie AI](./movie-ai) — RAG with Embeddings + Vector Search

A recommendation engine that answers from a private movie dataset rather than the model's memory.

- Content chunked and embedded with OpenAI `text-embedding-ada-002`, stored in **Supabase pgvector**
- User input embedded at query time and matched against the store through a `match_documents` similarity RPC with a tuned threshold
- The retrieved match is injected as context into a chat completion governed by a strict output-format system prompt

**Skills:** Embeddings, vector similarity search, retrieval-augmented generation, prompt design.

---

### [Translation App](./translation-app) — Secured LLM Backend

Small app, important lesson: **API keys never touch the browser.**

- Express server exposing a single `/api/translate` endpoint that proxies the LLM call, with keys loaded from `.env.local` via `node --env-file`
- The frontend only ever talks to its own backend, never the provider
- Markdown rendering sanitized with **DOMPurify** to prevent XSS from model output
- `concurrently` runs the Vite client and the Express server together under one `npm run dev`

**Skills:** Secret management, backend-for-frontend pattern, XSS mitigation.

---

### [Component Library](./component-library) — Reusable UI Primitives

`Badge`, `Card`, `Banner`, and `Testimonial` built as a proper design-system-style set: **variant and color props** driving styles through `clsx`, composition via `children`, and consistent APIs across components — the pattern behind libraries like shadcn/ui.

**Skills:** Component API design, conditional class composition, reusability.

---

### [Chef Claude](./chef-claude-app) — AI Recipe Generator

A React app that takes a list of ingredients and returns a recipe, wired to both the **Anthropic SDK** and the Hugging Face Inference API so the two providers sit behind one interchangeable interface. Markdown responses rendered with `react-markdown`.

**Skills:** LLM SDK integration, system prompt engineering, provider abstraction.

---

## Also In This Repo

Earlier and smaller builds covering the fundamentals: [express-api](./express-api) (REST API with CORS and routers), [quizzical-app](./quizzical-app) (Open Trivia DB quiz game), [tenzies-game](./tenzies-game), [react-travel-app](./react-travel-app), [movie-watchlist](./movie-watchlist), [momentum-dashboard](./momentum-dashboard), [color-scheme-generator](./color-scheme-generator), [instagram-clone](./instagram-clone), [x-clone](./x-clone), [nft-app](./nft-app), [restaurant-ordering-app](./restaurant-ordering-app), [password-generator](./password-generator), [basketball-scoreboard](./basketball-scoreboard), [unit-converter](./unit-converter), [learning-journal](./learning-journal), [hometown](./hometown), and [business-card](./business-card).

## Running Any Project

```bash
cd <project-name>
npm install
npm run dev     # or `npm start` for the Express projects
```

Projects that call external APIs need their own `.env` / `.env.local` — check each project's source for the expected variable names.
