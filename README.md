# Sketchly

<p align="center">
  <video src="https://raw.githubusercontent.com/bhupeshv29/sketchly2/main/fe/public/Demo.mp4" controls width="800">
    Your browser does not support the video tag.
  </video>
</p>

Real-time collaborative drawing canvas with AI-powered shape generation. Sketch, collaborate, and bring ideas to life in your browser.

## Architecture

Sketchly is composed of three services:

| Service | Directory | Tech | Port | Purpose |
|---|---|---|---|---|
| **Frontend** | `fe/` | Next.js 15, React 19, Tailwind CSS, shadcn/ui | 3000 | UI, canvas, drawing tools |
| **HTTP API** | `http/` | Express, Prisma, PostgreSQL, Gemini AI | 3001 | Auth, rooms, AI generation |
| **WebSocket** | `ws/` | ws (WebSocket), Prisma, PostgreSQL | 8080 | Real-time collaboration |

## Features

- **Drawing Tools** — Rectangle, Ellipse, Line, Pencil, Eraser, Grab/Pan
- **Real-time Collaboration** — Multi-user rooms via WebSocket
- **AI Shape Generation** — Describe what you want; Gemini generates the shape
- **Zoom & Pan** — Scroll to zoom, grab tool to pan
- **Custom Styling** — Configurable stroke color, background color, stroke width
- **User Authentication** — Signup/signin with JWT
- **Room-based Canvases** — Create and join named rooms, shapes persisted to DB

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, Zod |
| **HTTP Server** | Express, Prisma ORM, PostgreSQL, bcryptjs, jsonwebtoken |
| **WebSocket Server** | ws (WebSocket), Prisma ORM, PostgreSQL, jsonwebtoken |
| **AI** | Google Gemini 2.0 Flash (`@google/generative-ai`) |
| **Package Manager** | pnpm |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL instance

### Environment Variables

Create `.env` files in each service directory:

**`http/.env`**
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-key
PORT=3001
```

**`ws/.env`**
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
PORT=8080
```

**`fe/.env.local`**
```
NEXT_PUBLIC_HTTP_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:8080
```

### Run Locally

```bash
# 1. Start the HTTP API
cd http
pnpm install
pnpm prisma migrate dev
pnpm dev

# 2. Start the WebSocket server
cd ws
pnpm install
pnpm prisma migrate dev
pnpm dev

# 3. Start the frontend
cd fe
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Sign up** or **Sign in** at the landing page
2. **Create a room** from the dashboard or `/create-room`
3. **Join a room** by navigating to `/room/<room-name>`
4. **Draw** using the toolbar (keyboard shortcuts 1–6)
5. **Collaborate** — other users in the same room see your shapes in real time
6. **AI Generate** — click the AI button, describe a shape, and it appears on canvas

## Project Structure

```
sketchly2/
├── fe/                          # Next.js frontend
│   ├── app/                     # Pages (signin, signup, dashboard, room, create-room)
│   ├── canvas/                  # Canvas & RoomCanvas components
│   ├── components/              # UI components (Sidebar, Toolbar, AI button, auth forms)
│   ├── hooks/                   # useSocket, useUser, useRoombyName
│   ├── actions/                 # Server actions (register, login, getRoom)
│   ├── render/                  # Game.ts — canvas rendering engine
│   └── types.ts                 # Zod schemas (shared client-side)
├── http/                        # Express REST API
│   └── src/
│       ├── index.ts             # Routes (signup, signin, room, generate)
│       ├── ai.ts                # Gemini integration with system prompt
│       ├── middleware.ts        # JWT auth middleware
│       └── types.ts             # Zod schemas
├── ws/                          # WebSocket server
│   └── src/
│       ├── index.ts             # WS connection, room mgmt, draw/erase broadcast
│       └── checkUser.ts         # JWT verification
└── README.md
```

## Deployment

- **Frontend** — deploy `fe/` to Vercel
- **HTTP API** — deploy `http/` to Render, Railway, or any Node host
- **WebSocket** — deploy `ws/` to Render, Railway, or Fly.io (ensure sticky sessions if scaling)
