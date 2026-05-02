# Maintenance Mode Status Page

[![Vue](https://img.shields.io/badge/Vue-3.5-42b883?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

A production-ready status page builder that helps teams launch polished public pages for downtime communication, launch countdowns, and event breaks.

## Why This Project

When teams need to publish quick, branded status pages, building from scratch is slow and inconsistent. This project provides:

- a live admin UI for non-technical edits
- template-driven visual styles for different brand tones
- countdown and timer workflows for launches and event breaks
- simple file-based persistence with zero database setup

## Features

- Four page modes: `Under Construction`, `Launching Soon`, `Maintenance`, and `Timer`
- Three theme templates: `MinimalCorporate`, `CreativeIllustration`, `DarkTech`
- Real-time preview in admin before publish
- Brand controls for color, type scale, weight, spacing, and contact details
- Split-flap style countdown digits for high-visibility timers
- Optional motion mode with Three.js/Lottie-enhanced visual experience
- Config save/publish flow powered by a local API plugin writing to `config.json`

## Product Tour

- **Public page**: `http://localhost:5173/`
- **Admin panel**: `http://localhost:5173/admin`
- **Flow**: update content/design -> click **Save & Publish** -> public page reflects latest config

## Screenshots

Add screenshots/GIFs here for your repository page:

- `docs/screenshots/admin-dashboard.png`
- `docs/screenshots/public-minimal.png`
- `docs/screenshots/public-darktech.png`
- `docs/screenshots/timer-mode.png`

Example markdown (optional):

```md
![Admin Dashboard](docs/screenshots/admin-dashboard.png)
![Public Page - Minimal](docs/screenshots/public-minimal.png)
```

## Tech Stack

- **Frontend**: Vue 3, TypeScript, Vue Router
- **Build tooling**: Vite 5, vue-tsc
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **UI primitives**: Radix Vue, Reka UI, CVA utilities
- **Animation**: Three.js, `@lottiefiles/dotlottie-vue`
- **Icons**: `lucide-vue-next`

## Architecture Overview

- `src/views/AdminDashboard.vue` provides the editor UI and live preview workspace
- `src/views/PublicStatusPage.vue` renders the active public template
- `src/composables/useConfig.ts` manages loading/saving state and API calls
- `vite-plugin-config-api.ts` exposes `GET/POST /api/config` and persists `config.json`
- `src/components/templates/*` holds the template implementations

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build production assets

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Deployment with Docker

The production image is **multi-stage**: Node builds the app; the runtime image is **nginx only** (no Node process). Static files live under `/usr/share/nginx/html`. SPA routing and caching are configured in `nginx/default.conf`.

**Config in Docker:** `GET /api/config` is served from `config.json` next to the built assets (or `{}` if the file is missing). **`POST /api/config` is not available** in this static setup, so the in-browser **Save & Publish** flow from `npm run dev` does not persist inside the container. For production Docker, either mount a `config.json` you maintain on the host, bake config into the image after editing locally, or run a separate API if you need runtime writes.

### Prerequisites

- Docker Engine 24+ (or compatible)
- Docker Compose v2 (`docker compose` command)

### Using Docker Compose (typical on a VPS)

From the repository root:

```bash
docker compose build
docker compose up -d
```

By default the site is on **port 8080** (`http://<host>:8080/`, admin at `/admin`). Change the host port with `HTTP_PORT`:

```bash
HTTP_PORT=3000 docker compose up -d
```

To serve a fixed config without rebuilding, uncomment the `volumes` block in `docker-compose.yml` (or add your own) so the container reads a host file:

```yaml
volumes:
  - ./config.json:/usr/share/nginx/html/config.json:ro
```

Create `config.json` on the host before the first start if you use a bind mount (you can start from `{}`).

Useful commands:

```bash
docker compose logs -f web
docker compose up -d --build
docker compose build --no-cache && docker compose up -d
docker compose down
```

### Using Docker only (no Compose)

```bash
docker build -t maintenance-mode:latest .
docker run -d --name maintenance-mode-web -p 8080:80 --restart unless-stopped maintenance-mode:latest
```

Optional read-only config mount:

```bash
docker run -d --name maintenance-mode-web -p 8080:80 \
  -v "$(pwd)/config.json:/usr/share/nginx/html/config.json:ro" \
  --restart unless-stopped maintenance-mode:latest
```

## Configuration Model

The app uses a typed `AppConfig` object (`src/types/index.ts`) with fields including:

- `pageType`, `template`, `animationMode`
- `pageTitle`, `title`, `subtitle`, `ctaText`
- `companyName`, `contactEmail`, and brand typography controls
- `countdownDate`, `maintenanceMessage`

Defaults are merged with saved values from `config.json` so missing fields always resolve safely.

## API Behavior

The Vite middleware plugin handles config persistence:

- `GET /api/config` -> returns saved config (or empty object if not yet created)
- `POST /api/config` -> validates JSON and writes formatted data to `config.json`

This design keeps deployment simple for static-style environments that can run a Node/Vite process.

## Scripts

- `npm run dev` - starts development server
- `npm run build` - runs type-check and production build
- `npm run preview` - serves built app locally for verification

## Deployment Notes

- **Docker (nginx static image):** see [Deployment with Docker](#deployment-with-docker). There is no runtime write API; use a mounted `config.json`, rebuild the image after local `npm run build`, or add your own backend.
- **Node / Vite on a server:** ensure the process can run the dev or preview server with the Vite `config.json` plugin if you rely on `POST /api/config` from the admin UI.
- For larger teams or cloud-native setups, replace `vite-plugin-config-api.ts` with your own backend API.
- Keep `config.json` writable by the process user in environments where runtime edits from the app are expected.

## Roadmap

- Authentication and role-based access for `/admin`
- Config version history and rollback
- Multi-tenant/project support
- Additional templates and theme presets
- Optional backend adapters (S3, database, KV store)

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes with clear messages
4. Run `npm run build` and verify everything passes
5. Open a pull request with context and screenshots (if UI-related)

## License

Released under the MIT License. See `LICENSE` for details.
