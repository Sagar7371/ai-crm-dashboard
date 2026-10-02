# PHASE 4 — Real-time, Email, CSV

1. **Socket.IO** (`sockets/index.js`): authenticate on handshake with JWT, join `user:<id>` and `team:<id>` rooms. `notification.service.js` creates a Notification document and emits `notification:new`. Trigger on lead assignment, deal stage change, task due/overdue, inbound/outbound email, AI hot-lead alert.
2. **Client sockets**: `SocketContext`, `useNotifications` (unread count, mark read/all read, toast on arrival, auto-reconnect).
3. **Email** (`mail.service.js`, `email.controller.js`): SMTP send, templates with `{{variables}}`, `EmailLog` status tracking, list per lead/customer.
4. **CSV** (`csv.service.js`, `csv.controller.js`, `upload.middleware.js`): import with column mapping, per-row validation, duplicate detection, summary `{ imported, skipped, errors[] }`; export with current filters applied.
5. Add basic tests for auth, RBAC, and CSV import if time allows.

Output: manual test script for each feature.
