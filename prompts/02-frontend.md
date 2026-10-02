# PHASE 2 — Frontend

Implement in `client/src/`:
1. `services/api.js` (Axios, auth header, silent refresh on 401), `AuthContext`, `useAuth`, `ProtectedRoute` with role checks.
2. Layout: `Sidebar`, `Navbar`, `NotificationBell`, dark-mode toggle.
3. Pages: Login, Register, Dashboard, Leads (+ detail), Customers (+ detail), Deals, Pipeline (Kanban), Activities, Analytics, Emails, AiInsights, Notifications, Users (admin), Settings.
4. `KanbanBoard` + `DealCard` using @dnd-kit: drag between stages, optimistic update, rollback on error, stage totals.
5. `Table` with server-side pagination, search, filters, column sorting; `Modal`, `Button` and form components with validation.
6. Charts with Recharts: `RevenueChart`, `FunnelChart`, lead-source pie, leaderboard bar.
7. Loading skeletons, empty states, error boundaries, responsive down to mobile.

Output: route map and component tree summary.
