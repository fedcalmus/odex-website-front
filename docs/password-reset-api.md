# Password reset endpoints

The frontend has a 3-screen password-reset flow with no backend wired up
yet — each screen just moves to the next URL on a client-valid submit.
Source: `src/sections/auth/ResetPassword/` (forms/validation),
`src/app/(auth)/reset-password/` (routes), `src/content/auth.ts`
(`resetPasswordCopy`). This doc specifies the two endpoints needed.

Entry point: a "Մոռացե՞լ եք գաղտնաբառը" (forgot password) link on `/login`
— not in the Login mock itself, added this build — pointing to
`/reset-password`.

## Flow

1. `/reset-password` (Figma "Auth · Reset request — MP-13a") — email
   address only.
2. `POST /api/v1/auth/password-reset/request/` → generates a token, sends
   the reset email, frontend moves to `/reset-password/sent`.
3. `/reset-password/sent` (Figma "Auth · Reset sent — MP-13b") — "check
   your inbox" screen, same shared component as
   `docs/email-verification-api.md`'s verify-email screen.
4. User clicks the link in the email → lands on `/reset-password/new` with
   the token (see "Token" below for how this should actually work).
5. `/reset-password/new` (Figma "Auth · New password — MP-13c") — new
   password + confirm, with a live strength meter.
6. `POST /api/v1/auth/password-reset/confirm/` → sets the new password,
   frontend redirects to `/login?reset=success` (shows a "password
   changed" notice there).

## Step 1 — Request

```
POST /api/v1/auth/password-reset/request/
```

```json
{ "email": "anush@example.am" }
```

- **Public** (`AllowAny`).
- **Always respond successfully regardless of whether the email exists** —
  standard practice to avoid leaking which addresses are registered via
  this endpoint. Only actually send the email if the account exists.
- Generate a single-use token with a **30-minute expiry** — the "sent"
  screen tells the user this explicitly: "Այն գործում է 30 րոպե" (valid for
  30 minutes). Keep the backend expiry and that copy in sync if either
  changes.
- Rate-limit by email and/or IP (same reasoning as the resend endpoint in
  `docs/email-verification-api.md` — an obvious mail-bombing vector
  otherwise). The frontend's own "resend" button enforces a **2-minute**
  client-side cooldown ("սպասեք 2 րոպե՝ կրկին ուղարկելուց առաջ" — wait 2
  minutes before resending), so the backend should allow at least that
  cadence and no faster.

### Email content

Same "branded transactional email" requirement as
`docs/email-verification-api.md` — dark theme, lime CTA, Armenian copy. Specific to this one:

- Subject: something direct, e.g. "Վերականգնեք ձեր գաղտնաբառը" (reset your
  password).
- CTA button linking to wherever `/reset-password/new` resolves the token
  (see "Token" below).
- State the 30-minute expiry explicitly, matching the in-app copy.
- **Include a "didn't request this?" line** — standard for password-reset
  emails, not currently a written requirement anywhere in the frontend
  copy, but worth having since this email can be triggered by anyone who
  knows an address.

## Token: decide the confirm page's shape before building step 2

The frontend's `/reset-password/new` page currently has **no token
handling at all** — it's reached directly in this demo, with nothing read
from the URL. In production this needs one of two shapes, and the confirm
endpoint's contract depends on which:

**Option A — token in the URL, read by the frontend page:**
`/reset-password/new?token=...`, page reads it (same pattern as
`/verify-email?email=...` and `/reset-password/sent?email=...` elsewhere
in this app), and `POST .../confirm/` takes the token in the body:

```json
{ "token": "...", "password": "NewOdex2026x" }
```

**Option B — token validated server-side before the page ever renders**
(e.g. a backend redirect/short-lived session), and the confirm endpoint
doesn't need the token in the body at all, just the new password against
whatever session the token established.

Option A is the smaller change (matches the existing query-param pattern
already used twice in this app) — recommending it unless there's a reason
the backend prefers B. Either way, **an expired or already-used token
needs a distinct error** so the frontend can show something better than a
generic failure (there's no such UI today — flagging as a follow-up once
the shape is picked).

## Step 2 — Confirm

```
POST /api/v1/auth/password-reset/confirm/
```

```json
{
  "token": "...",
  "password": "NewOdex2026x"
}
```

| Field | Type | Validation (already enforced client-side, server must re-check) |
| --- | --- | --- |
| `token` | string | See "Token" above — required under Option A, omit under Option B |
| `password` | string | Min 8 chars, must contain at least one digit — same minimum as every other password field in this app. No `confirm_password` field needed server-side; the frontend already checks the two fields match before submitting. |

On success: invalidate the token (one-time use), invalidate any existing
sessions for that account if that's your normal security practice for a
password change, and return `200`. The frontend doesn't need anything
back in the body — it redirects straight to `/login?reset=success`
regardless.

### Errors

| Status | Case |
| --- | --- |
| 400 | Weak password (re-validate server-side even though the frontend already checks) |
| 400/410 | Invalid, expired, or already-used token — see the note above about giving this a distinct error from a generic 400 |

## Not in scope here

- **The strength meter shown on `/reset-password/new`** is purely a
  client-side UX hint (`src/lib/password-strength.ts`) — it has no
  bearing on what the backend accepts. Don't infer a stricter password
  policy from it; the actual minimum is the 8-chars-plus-digit rule above,
  same as everywhere else in the app.
- **Google/Apple-linked accounts** — if an account was created via OAuth
  and has no password, this flow doesn't currently have any handling for
  that case either in the UI or in this spec. Flag back if that's a real
  scenario to handle (OAuth isn't wired up anywhere yet regardless, per
  `docs/signup-api.md`).
