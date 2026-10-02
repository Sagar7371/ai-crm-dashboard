# PHASE 1 — Backend Foundation

Implement in `server/src/`:
1. `config/db.js`, `config/env.js`; wire `server.js` (connect DB, init Socket.IO) and mount all routes in `app.js` with the error middleware.
2. All Mongoose models with validation, indexes, and `toJSON` that strips sensitive fields.
3. `auth` (register, login, refresh, logout, me), `auth.middleware.js` (JWT verify), `role.middleware.js` (`authorize('admin','manager')`).
4. CRUD controllers + routes for users, leads, customers, pipelines, deals, activities with pagination/search/filter/sort and role-scoped queries (sales = own records only).
5. `ApiError`, `asyncHandler`, Zod `validate.middleware.js`, rate limiter.
6. `utils/seed.js` with realistic demo data.

Output: list of endpoints with example requests, and a short test checklist (curl/Postman).
