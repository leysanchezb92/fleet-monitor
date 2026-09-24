# Fleet Monitor

Real-time vehicle monitoring dashboard built as a technical challenge for a Design Engineer role.

## Live Demo
[fleet-monitor-psi.vercel.app](https://fleet-monitor-psi.vercel.app)

## Repository
[github.com/leysanchezb92/fleet-monitor](https://github.com/leysanchezb92/fleet-monitor)

---

## Tech Stack

- **React + Vite** — UI framework and build tool
- **Tailwind CSS v4** — Utility-first styling with CSS custom properties
- **Leaflet / React-Leaflet** — Interactive map rendering
- **Traccar API** — Real GPS tracking data (demo.traccar.org)
- **Vercel** — Deployment and serverless proxy

---

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/leysanchezb92/fleet-monitor.git
cd fleet-monitor
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment variables
Create a `.env` file in the root:
```env
VITE_TRACCAR_EMAIL=your@email.com
VITE_TRACCAR_PASSWORD=yourpassword
```

### 4. Run the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

---

## API Integration

The app connects to [Traccar](https://www.traccar.org/) — an open source GPS tracking platform.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/session` | POST | Authenticate user |
| `/api/devices` | GET | Fetch registered devices |
| `/api/positions` | GET | Get current position by deviceId |

### CORS Proxy
In development, Vite's dev server proxies `/api/*` requests to `https://demo.traccar.org`.
In production, a Vercel serverless function (`/api/proxy.js`) handles the proxy.

---

## Features

- **Real-time GPS tracking** — Polls position every 10 seconds
- **Interactive map** — Leaflet with smooth marker animation and auto-center
- **Custom vehicle marker** — SVG arrow that rotates based on GPS course
- **Status card** — Speed (km/h), course, coordinates, last signal timestamp
- **Loading skeletons** — Animated placeholders that match the final layout
- **Error state** — Empathetic error screen with retry button
- **Dark / Light mode** — Full theme switch with CSS custom properties
- **Responsive design** — Mobile and desktop layouts
- **Accessibility** — WCAG 2.1 AA compliant

---

## Accessibility

- Semantic HTML (`section`, `aside`, `header`, `dl`, `dt`, `dd`)
- ARIA roles and labels (`role="alert"`, `role="status"`, `role="switch"`, `aria-live`)
- Full keyboard navigation (Tab, Enter, Space, Arrow keys, Escape)
- Visible focus indicators on all interactive elements
- High contrast color ratios (4.5:1 minimum)

---

## Design System

Colors are managed via CSS Custom Properties, supporting both light and dark themes:

| Token | Light | Dark |
|-------|-------|------|
| `--color-bg` | `#F9FAFB` | `#111827` |
| `--color-surface` | `#FFFFFF` | `#1F2937` |
| `--color-accent` | `#0D9488` | `#38BDF8` |
| `--color-text-primary` | `#0F172A` | `#F9FAFB` |

---

## AI Assistance

This project was built with Claude (Anthropic) as a coding copilot. Key areas where AI accelerated development:

- Initial component structure and API integration layer
- Accessibility attributes (ARIA roles, keyboard navigation patterns)
- CSS animation keyframes for skeleton loading states

Key corrections made to AI output:
- Removed redundant `aria-live="assertive"` on `role="alert"` elements (MDN spec violation)
- Fixed proxy content-type header (`application/x-www-form-urlencoded` vs JSON)
- Replaced emoji-based theme toggle with accessible SVG icon switch
- Corrected Vite base path configuration for Vercel deployment

---

## Deploy

```bash
npm run build
vercel --prod
```