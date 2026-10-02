# MASTER PROMPT — AI-Powered CRM Dashboard (MERN)

Paste this into your AI coding assistant (Claude Code, Cursor, Copilot, etc.) with this project folder open.
Then run the phase prompts (01 → 04) one at a time.

---

## Role
You are a senior full-stack engineer. Build a production-quality, multi-user **AI-Powered CRM Dashboard** using the MERN stack. Work inside the existing folder structure (`server/` and `client/`). Replace every `TODO` stub with working code. Write clean, modular, commented code. Never hard-code secrets.

## Tech Stack
- **Frontend:** React 18 (Vite), Tailwind CSS, React Router v6, Axios, Recharts, @dnd-kit (Kanban), socket.io-client, react-hot-toast, lucide-react
- **Backend:** Node.js, Express.js (ES modules), MongoDB + Mongoose, Socket.IO, JWT, bcryptjs, Zod, Multer, csv-parser, json2csv, Nodemailer, Helmet, CORS, express-rate-limit
- **AI:** a provider-agnostic wrapper in `server/src/services/ai.service.js` (API key + model from `.env`). All AI features call this single wrapper.

## Core Features
1. **Authentication & RBAC** — register/login, access + refresh JWT, bcrypt hashing, roles: `admin`, `manager`, `sales`. Admin manages users; managers see their team; sales see only their own records.
2. **Leads** — CRUD, status (new, contacted, qualified, lost, converted), source, owner, tags, notes, search/filter/sort/pagination, convert lead → customer.
3. **Customers** — CRUD, company info, contacts, linked deals/activities/emails, lifetime value.
4. **Sales Pipelines & Deals** — configurable pipelines/stages, deal value, probability, expected close date, owner. **Kanban board** with drag-and-drop between stages (persisted, optimistic UI).
5. **Activities** — calls, meetings, tasks, notes with due dates and reminders; timeline per lead/customer/deal.
6. **Real-time notifications (Socket.IO)** — JWT-authenticated sockets, per-user rooms; notify on lead assignment, deal stage change, task due, new email, AI alerts. Notification bell with unread count, mark-as-read.
7. **Sales analytics dashboard** — KPI cards (revenue, win rate, open deals, new leads), revenue over time, funnel by stage, leads by source, team leaderboard; date-range filters. Use MongoDB aggregation pipelines.
8. **Email integration** — send emails via SMTP (Nodemailer) from a lead/customer/deal; store in `EmailLog`; email templates.
9. **CSV data management** — import leads/customers (validate, report row errors, dedupe by email) and export any list to CSV.
10. **AI capabilities**
    - **Lead scoring** (0–100 + short reasons + category hot/warm/cold)
    - **Customer summary** (from profile, deals, activities, emails)
    - **Follow-up recommendations** (next best action + suggested date)
    - **AI-generated emails** (tone/goal selectable, editable before send)
    - **Sales insights** (weekly narrative: trends, risks, opportunities)
    Cache AI results in MongoDB with a timestamp; allow manual refresh. Handle provider errors gracefully.

## Data Models (Mongoose)
`User`, `Lead`, `Customer`, `Deal`, `Pipeline` (stages[]), `Activity`, `Notification`, `EmailLog`.
Use timestamps, indexes on frequently filtered fields (owner, status, stage, email), and references via ObjectId. Lead/Customer/Deal include `aiScore`/`aiSummary`/`aiNextAction` sub-docs with `generatedAt`.

## API Design
REST under `/api`: `/auth`, `/users`, `/leads`, `/customers`, `/deals`, `/pipelines`, `/activities`, `/analytics`, `/notifications`, `/emails`, `/ai`, `/csv`.
Consistent response shape `{ success, data, message }`, centralized error middleware, Zod validation, pagination (`page`, `limit`, `sort`, `q`).

## Security & Quality
Helmet, CORS allow-list, rate limiting on auth + AI routes, input validation, no sensitive fields in responses, ownership checks in every controller, `.env.example` kept updated, ESLint-clean code.

## UI/UX
Responsive, modern dashboard layout (sidebar + top navbar), light/dark mode, loading skeletons, empty states, toasts, form validation, accessible components.

## Deliverables
- Fully working app: `npm run dev` in both `server/` and `client/`
- `server/src/utils/seed.js` creating demo users (admin/manager/sales), leads, customers, deals, activities
- Updated `README.md` with setup, env vars, API list, and screenshots placeholders

## Working Rules
- Build in the phases defined in `prompts/01…04`. After each phase, summarize what was done and how to test it.
- Do not change the folder structure without explaining why.
- Ask before adding any dependency not listed above.
