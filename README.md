# AI-Powered CRM Dashboard — MERN Stack

Multi-user CRM: leads, customers, pipelines, deals (Kanban), activities, analytics, email, CSV, real-time notifications (Socket.IO), JWT + RBAC, and AI (lead scoring, summaries, follow-ups, email drafts, sales insights).

## How to use this package
1. Unzip and open the folder in your AI coding tool.
2. Give it `prompts/00-master-prompt.md`, then run `01` → `04` in order.

## Run locally
```bash
cd server && cp .env.example .env && npm install && npm run dev
cd client && cp .env.example .env && npm install && npm run dev
```
Client: http://localhost:5173 · API: http://localhost:5000/api

## Structure
```
prompts/   AI build prompts (phased)
server/    Express API, models, services, sockets
client/    React + Tailwind app
```
