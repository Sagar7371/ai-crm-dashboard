# PHASE 3 — AI Features

Backend (`server/src/services/`, `controllers/ai.controller.js`, `routes/ai.routes.js`):
1. `ai.service.js` — single wrapper: `generate({ system, prompt, json })`, retries with backoff, timeout, JSON-mode parsing with safe fallback, token/usage logging.
2. `leadScoring.service.js` — input: lead fields + activities + email engagement. Output JSON: `{ score, category, reasons[] }`. Store in `lead.aiScore`.
3. `summary.service.js` — concise customer summary + key risks/opportunities.
4. `followUp.service.js` — `{ action, channel, suggestedDate, rationale }`.
5. `emailGen.service.js` — inputs: recipient context, goal, tone, length → `{ subject, body }`.
6. `insights.service.js` — aggregates analytics for a date range and returns a narrative with 3–5 actionable insights.
7. Routes: `POST /ai/lead-score/:id`, `/ai/customer-summary/:id`, `/ai/follow-up/:id`, `/ai/generate-email`, `GET /ai/insights`. Rate-limited, role-scoped, results cached with `generatedAt`.

Frontend: `LeadScoreBadge`, `AiSummaryPanel`, `EmailComposer` (generate → edit → send), AI Insights page with refresh + loading state, graceful error UI.

Prompt-engineering rule: system prompts must instruct the model to return strict JSON, never invent data not provided, and keep outputs short.
