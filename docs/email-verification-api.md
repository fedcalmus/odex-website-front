# Email verification (sent after sign-up)

After a successful sign-up (`docs/signup-api.md`), the user's account
should be created as **unverified**, and a verification email sent
immediately. There is currently **no frontend UI at all** for this — no
"check your inbox" screen, no "verify your email" banner, no resend
button. This doc specifies the backend side (token + email + confirm
endpoint); the frontend pieces are called out explicitly at the end so
nothing is silently assumed to already exist.

## Flow

1. `POST /api/v1/auth/register/` succeeds → account created with
   `email_verified: false` → a verification token is generated and the
   email is sent.
2. User clicks the link in the email → hits a confirmation endpoint →
   account flips to `email_verified: true`.
3. (Optional but recommended) a resend endpoint, for when the email never
   arrives or the token expired.

## Token

```
POST /api/v1/auth/register/   (as in docs/signup-api.md)
```

generates, alongside the user record:

- A single-use token (UUID or signed JWT — whichever your existing auth
  stack already uses elsewhere is fine, no frontend constraint here since
  nothing consumes it client-side yet).
- An expiry — **24–48 hours** is a reasonable default; there's no specific
  requirement from the design, just don't make it so short that a normal
  "I'll check my email later tonight" user misses it.
- One-time use: once confirmed, the token should not work again.

## Confirmation endpoint

```
GET /api/v1/auth/verify-email/?token=<token>
```

(or `POST` with the token in the body — either is fine; `GET` is simpler
if this is meant to be the literal link target in the email, so clicking it
in any mail client just works without a frontend page in between. If you'd
rather the link land on a frontend page that then calls a `POST` endpoint,
that's a frontend page that needs to be built — flag back if you want that
instead of a direct backend link.)

- **Public** (`AllowAny`) — the token itself is the auth.
- On a valid, unexpired, unused token: mark `email_verified: true`,
  invalidate the token, redirect (or respond with) a success state.
- On an invalid/expired/already-used token: a clear error, ideally
  distinguishing "expired" (so a frontend can offer "resend") from
  "already verified" (so it can say "you're all set, no action needed")
  from "invalid" (genuinely broken link).

## Resend endpoint (recommended)

```
POST /api/v1/auth/resend-verification/
```

```json
{ "email": "anush@example.am" }
```

- **Public**, but rate-limit it (per email and/or per IP) — this is an
  obvious abuse vector (mail-bombing an address) if left unthrottled.
- If the email is already verified, respond successfully but don't
  actually send anything (don't leak verification status to an
  unauthenticated caller beyond "ok, check your inbox" either way).

## Email content

The request was for "very [rich/detailed] email context" — i.e. this
should be a proper branded transactional email, not a bare link in plain
text. There's no existing email template in this codebase to copy from,
so here's what it should cover, matching the site's tone (direct,
Armenian, says what to do):

- **Brand**: ODex wordmark/logo, dark theme to match the site
  (`#0e1413` background per `src/app/layout.tsx`'s `themeColor`), lime
  accent (`#c5f42d`, the site's `--color-brand-primary`) for the CTA
  button — see `src/styles/abstracts/_colors.scss` for the full palette if
  you want to match it closely.
- **Subject line**: something direct, e.g. "Հաստատեք ձեր էլ. փոստի
  հասցեն" (Confirm your email address).
- **Body**: a short line explaining why (so tickets/updates reach the
  right inbox — this mirrors the sign-up form's own helper text: "Տոմսերը
  և հիշեցումները գալիս են այստեղ" / "tickets and reminders come here"),
  then a clear CTA button: "Հաստատել էլ. փոստը" (Confirm email), linking
  to the verification endpoint above.
- **Fallback**: a plain-text link under the button for clients that strip
  styled buttons.
- **Expiry notice**: tell the user the link expires (match whatever
  window you pick above), e.g. "Հղումը գործում է 48 ժամ" (the link is
  valid for 48 hours).
- **Footer**: standard transactional-email footer (sender address,
  physical/company info if you already have a template for this elsewhere
  in the product — reuse it rather than inventing a new one here).

## Should unverified users be blocked from anything?

Open product question, not answered by the frontend today: right now
nothing in the UI checks `email_verified` before letting someone book,
browse, or do anything else. Decide (with product) whether:

- Unverified users can do everything except maybe receive
  tickets/notifications reliably (soft gate), or
- Certain actions (booking, in particular — tickets are explicitly tied to
  email) should be blocked until verified (hard gate).

If a hard gate is wanted, that needs a frontend banner/blocking screen
that doesn't exist yet — flag this back once decided, it's a small but
real frontend task.

## Not yet built on the frontend (flagging explicitly)

- A "check your inbox" confirmation screen after sign-up.
- A persistent "please verify your email" banner/reminder for unverified
  accounts.
- A "resend verification email" button anywhere in the UI.
- Any UI for the `GET /verify-email/?token=...` landing experience, if you
  want that to go through a frontend page rather than resolving directly
  on the backend.
