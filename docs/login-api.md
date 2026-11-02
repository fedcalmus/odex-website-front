# Sign-in endpoint

The frontend has a public sign-in form at `/login`
(`src/sections/auth/Login/LoginForm.tsx`, schema in
`src/sections/auth/Login/login.validation.ts`) with no backend wired up yet
— it currently just redirects on a client-side-valid submit (any non-empty
password "succeeds"). This doc specifies the endpoint needed to make it
real.

## Endpoint

```
POST /api/v1/auth/login/
```

- **Public** (`AllowAny`).
- Standard email + password check against the account created by
  `docs/signup-api.md` (or `docs/complete-profile-api.md`'s account-details
  step, if that path is also kept — see that doc's note on the two
  account-creation entry points).

## Request body

```json
{
  "email": "anush@example.am",
  "password": "Odex2026x"
}
```

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `email` | string | **yes** | Same dot-domain format check as sign-up. |
| `password` | string | **yes** | Just "non-empty" client-side — this is a login, not account creation, so there's no length/complexity rule to re-check. The server is the sole source of truth for whether the credentials are actually correct. |

## Response

**200 OK** — same user/token shape as `docs/signup-api.md`'s response, so
the frontend can use one response handler for both:

```json
{
  "user": {
    "id": "uuid",
    "full_name": "Անուշ Օրինակյան",
    "email": "anush@example.am",
    "phone": "+374 91 234 567",
    "email_verified": true
  },
  "token": "..."
}
```

## Errors

| Status | Case | Notes |
| --- | --- | --- |
| 400 / 401 | Wrong email or password | **Recommend a generic "invalid email or password" message that doesn't reveal which one was wrong** — standard practice to avoid leaking which emails are registered. The frontend doesn't currently have per-field error UI for this (login errors would need a form-level banner, not a field error — flag back to frontend if you want field-level instead). |

## Not in scope here

- **Google/Apple sign-in** — same inert buttons as sign-up, not wired.
- **"Մուտք հեռախոսահամարով" (sign in by phone)** — the page has a link to
  `/login/phone`, but that page/flow doesn't exist anywhere in the
  frontend. Not required unless you specifically want to build phone-based
  login; flagged here so it isn't assumed to already work.
- **Remember-me / session length** — no such control in the UI; use
  whatever your existing session/token lifetime defaults are.
