# Sign-up endpoint (public user registration)

The frontend has a public sign-up form at `/register`
(`src/sections/auth/SignUp/SignUpForm.tsx`, schema in
`src/sections/auth/SignUp/sign-up.validation.ts`) with no backend wired up
yet — it currently just redirects on a client-side-valid submit. This doc
specifies the endpoint needed to make it real.

## Endpoint

```
POST /api/v1/auth/register/
```

- **Public** (`AllowAny`).
- Creates a new user account in an **unverified** state and triggers the
  verification email (see `docs/email-verification-api.md` — same flow,
  separate doc because the email itself has its own requirements).
- On success, return enough to let the frontend treat the user as
  logged-in immediately (see "Session" below) — the UX continues straight
  into the post-signup flow (`docs/complete-profile-api.md`) without a
  second login step.

## Request body

```json
{
  "full_name": "Անուշ Օրինակյան",
  "email": "anush@example.am",
  "phone": "+374 91 234 567",
  "password": "Odex2026x"
}
```

| Field | Type | Required | Validation (already enforced client-side, server must re-check) |
| --- | --- | --- | --- |
| `full_name` | string | **yes** | Trimmed, max 80 chars, must contain at least two space-separated words (first + last name). Client error: "Մուտքագրիր անունը և ազգանունը" |
| `email` | string | **yes** | Trimmed, must match `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$` (a bare `aram@odex` with no dot is rejected client-side). **Must be unique** — return `409` if already registered. |
| `phone` | string | **no** | Optional field ("ոչ պարտադիր" in the UI). When present: chars limited to digits/space/`()`/`+`/`-`, and must contain 8–12 digits total (room for the `+374` prefix). Omit/empty is valid. |
| `password` | string | **yes** | Min 8 chars, must contain at least one digit (no letter-complexity rule here — this is deliberately looser than the account-details form in the profile-completion flow, which also requires a letter). |

Client also requires a `agree_to_terms: true` checkbox before submit — this
doesn't need to be persisted as a field, but worth logging (timestamp +
IP) for compliance if you want a record of consent, same spirit as the
waiver acceptance in `docs/complete-profile-api.md`.

## Response

**201 Created**

```json
{
  "user": {
    "id": "uuid",
    "full_name": "Անուշ Օրինակյան",
    "email": "anush@example.am",
    "phone": "+374 91 234 567",
    "email_verified": false
  },
  "token": "..."
}
```

Exact shape of the session/auth token is up to your existing auth pattern
(JWT, DRF token, session cookie, whatever the rest of the API already
uses) — the frontend has **no auth/session handling wired up at all yet**
(no token storage, no `Authorization` header on `apiFetch` calls). That's a
separate frontend follow-up once this contract is confirmed; for now, just
document what the response contains so that work can start.

## Errors

| Status | Case | Body |
| --- | --- | --- |
| 400 | Validation failure | Field-level errors, keyed the same as the request body (`email`, `password`, etc.) so they can be mapped back onto the form |
| 409 | Email already registered | A generic "this email is already registered" message — the frontend doesn't currently have a UI path for this error, so include enough detail for a future "sign in instead?" prompt |

## Not in scope here

- **Google/Apple sign-up** — the buttons exist in the UI
  (`src/components/SocialAuthButtons/`) but are inert (`onClick` no-ops).
  OAuth is not required for this endpoint; flag separately if/when you want
  to wire it up.
- **Phone verification / SMS** — phone is collected but nothing currently
  sends an SMS or verifies it.
