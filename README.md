# Vue.js Status Page Manager Implementation Plan

This project will build a status page manager using Vue 3, Vite, and shadcn-vue. It will feature an admin dashboard for content management and a public-facing view that dynamically renders one of three page types (Under Construction, Launching Soon, Maintenance) in one of three design templates.

> [!WARNING]
> This plan proposes using a custom Vite middleware (plugin) during development to handle reading and writing to `config.json` on the filesystem. This allows the admin dashboard to actually save data locally without needing a separate backend server like Express. For production deployment, you would need a small backend server to persist this data.

## Open Questions

1. **Backend Persistence for Production:** The prompt mentions storing settings in `config.json`. For local development, I will create a Vite API middleware to write to the file system. Do you need a production-ready backend (e.g., Express.js or Nuxt.js) included in this plan, or is the local Vite/JSON approach sufficient for your current needs?
2. **Illustrations:** The requirements mention "Include 1 illustration or animation concept per template". I can use abstract CSS shapes, SVG patterns, or AI-generate placeholder images for these. Do you have a preference?

## Proposed Architecture

- **Framework**: Vue 3 (Composition API) + Vite
- **UI Components**: shadcn-vue + Tailwind CSS
- **Routing**: Vue Router (Paths: `/` for public view, `/admin` for dashboard)
- **State Management**: Vue's native reactivity (`ref`/`reactive`) or a composable to handle the synchronized state between the form and the live preview.
- **Data Storage**: A local `config.json` file, read/written via simple API endpoints provided by a Vite dev server plugin.
- **Icons**: `lucide-vue-next` (standard with shadcn-vue)

## UI Layout & Design System

### 1. Typography & Colors

- **Fonts**: Inter (default/Minimal/Dark Tech) and Poppins (Creative).
- **Colors**:
  - _Minimal Corporate_: Slate/Zinc tones, subtle blue primary (`#2563eb`), extensive whitespace.
  - _Creative Illustration_: Indigo primary, vibrant purple/pink gradients, soft shadows.
  - _Dark Tech_: Deep slate background (`#020617`), neon cyan/emerald accents, glowing text/shadows.
- **Spacing**: Tailwind's default 4-point grid system (e.g., `p-4`, `m-8`, `gap-6`).

### 2. Admin Dashboard Layout (`/admin`)

- **Container**: Full screen (`h-screen w-full`), hidden overflow to act as an app.
- **Sidebar**: Fixed width (e.g., 300px), containing navigation and save controls.
- **Editor Panel**: Next to the sidebar, containing form controls (Page Type, Template, Title, Subtitle, CTA, Date, etc.).
- **Live Preview Panel**: A split-screen area on the right, scaled down or responsive iframe-like container, showing exactly what the public page will look like.

### 3. Public Status Page Layout (`/`)

- **Layout**: Centered flex/grid layout (`min-h-screen flex items-center justify-center`).
- **Header**: Logo placeholder and optional top-right navigation/contact.
- **Hero/Main**:
  - Headline (dynamic from config)
  - Subtext (dynamic from config)
  - Countdown Timer (if "Launching Soon")
  - "Live as on" text (if "Maintenance")
- **Visuals**: Template-dependent background or illustration.
- **Footer**: Simple copyright or helpful links.

## Proposed Changes

### Frontend Infrastructure

- Initialize `vite` with `vue-ts`.
- Install and configure `tailwindcss`, `postcss`, `autoprefixer`.
- Initialize `shadcn-vue` and add core components (`button`, `input`, `select`, `card`, `tabs`, `label`).
- Set up Vue Router for `/` and `/admin` routes.

### API & State

- Create `vite-plugin-config-api.ts` to mock API routes (`GET /api/config`, `POST /api/config`) that interact with `config.json`.
- Create `src/composables/useConfig.ts` to fetch, update, and save the configuration state.

### Component Breakdown

#### `src/views/AdminDashboard.vue`

- Main admin layout with Sidebar, Editor Form, and Preview window.
- Uses `shadcn-vue` components for the form inputs.

#### `src/views/PublicStatusPage.vue`

- Fetches `config.json` on mount.
- Uses a dynamic component `<component :is="activeTemplate" />` based on the selected template.

#### `src/components/templates/`

- `MinimalCorporate.vue`: Clean UI, centered text, minimal borders.
- `CreativeIllustration.vue`: Playful, uses blob shapes and gradients.
- `DarkTech.vue`: Dark mode forced, neon accents, monospace elements.

## Verification Plan

### Automated/Manual Verification

- [ ] Verify `npm run dev` starts both the frontend and the local API endpoints.
- [ ] Navigate to `/admin`, modify the title and page type, and observe the real-time preview updating instantly.
- [ ] Click "Save & Publish" in the admin dashboard and verify `config.json` is updated on the filesystem.
- [ ] Navigate to `/` and verify the public page renders the exact configuration saved in `config.json`.
- [ ] Test the countdown timer functionality for the "Launching Soon" page type.
- [ ] Toggle between all 3 design templates to ensure they render distinctly and correctly.
