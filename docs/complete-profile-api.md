# Post-sign-up profile-completion flow (appears right after sign-up)

After a successful sign-up (`docs/signup-api.md`), the frontend redirects
straight into a 3-step flow at `/complete-profile/waiver` →
`/complete-profile/health` → `/complete-profile/emergency-contact`
(source: `src/app/(auth)/complete-profile/`, content in
`src/content/complete-profile.ts`). None of these three steps call a
backend yet — each just moves to the next URL on a client-valid submit.
This doc specifies the three endpoints needed.

There's also a fourth, separate page at the bare `/complete-profile` URL
(`src/sections/profile/AccountDetails/AccountDetailsForm.tsx`) that asks
for email + password again — **this is NOT part of the sign-up redirect
chain**. It's a standalone entry point for someone who reaches this flow
without having signed up first (e.g. a future "start booking without an
account" path). Since `docs/signup-api.md` already covers account
creation, you likely don't need a second account-creation endpoint — just
be aware this page exists and currently has no backend of its own either,
in case you want it to reuse the sign-up endpoint directly.

## Step 1 — Waiver (risk acceptance agreement)

```
POST /api/v1/profile/waiver/
```

- **Authenticated** (the user from sign-up).
- The UI shows two separate checkboxes, both required — not the same
  checkbox rendered twice:
  - "Կարդացել և ընդունում եմ ռիսկի պայմանները" (read the specific terms
    inside the agreement card)
  - "Կարդացել եմ և ընդունում եմ ռիսկի համաձայնագիրը" (accept the
    agreement overall, shown after the under-18 warning)

### Request

```json
{
  "accepted_terms": true,
  "accepted_agreement": true
}
```

Both must be `true` to succeed (`400` otherwise).

### What to store

This is a liability waiver — store it properly, not just a boolean:

- `user_id`
- `agreement_version` — the card shows a version badge, currently **"v1.2"**
  hardcoded in the frontend copy. Whatever version string you store should
  match what's shown to the user at acceptance time.
- `accepted_at` timestamp
- Consider also storing IP address / user agent if that matters for your
  compliance requirements — the footnote under the form literally tells the
  user "Համաձայնագիրը պահվում է ձեր հաշվում՝ տարբերակով և ամսաթվով" (the
  agreement is stored in your account with version and date), so the
  product expectation is already set.

### Response

**200/201** with the stored record is enough — the frontend doesn't
currently render anything from the response, it just redirects to the
Health step on success.

---

## Step 2 — Health information (all fields optional)

```
POST /api/v1/profile/health/
```

- **Authenticated**.
- **Every field is optional** — "Բոլոր դաշտերը ոչ պարտադիր են" (all
  fields are optional) is the page's own lead copy. A completely empty
  submit is valid and expected (there's also a "Լրացնել ավելի ուշ" / fill
  in later skip link that bypasses the form entirely and goes straight to
  the next step).

### Request

```json
{
  "nothing_to_disclose": false,
  "allergies": "ընկույզ, պենիցիլին",
  "conditions": ["asthma"],
  "medications": "ինհալատոր",
  "blood_type": "O+"
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `nothing_to_disclose` | boolean | When `true` on the frontend, the UI clears and disables every other field in this request — so if this is `true`, treat the rest as empty regardless of what's sent. |
| `allergies` | string, optional | Free text, max 200 chars. Placeholder example: "ընկույզ, պենիցիլին, մեղվի խայթոց" |
| `conditions` | string[], optional | Each value must be one of: `asthma`, `cardiovascular`, `diabetes`, `epilepsy`, `other`. This is a **small fixed set defined in the frontend content file**, not the backend taxonomy — confirm these 5 values are what you want to store, or tell us if there's an existing medical-conditions enum to align with instead. |
| `medications` | string, optional | Free text, max 200 chars. Placeholder example: "ինհալատոր, EpiPen" |
| `blood_type` | string, optional | One of: `A+`, `A−`, `B+`, `B−`, `AB+`, `AB−`, `O+`, `O−` (note: minus sign is U+2212 "−", not a hyphen, in the frontend's option labels — worth normalizing on the way in). |

### ⚠️ Data-visibility requirement from the UI copy

The form displays this notice above the fields: **"Տեսնում են միայն այս
միջոցառման ակումբը և նշանակված ուղեկցորդները՝ մեկնարկից 24 ժամ առաջ"**
("Only this event's club and the assigned guides can see this, starting 24
hours before departure"). This is a real access-control promise made to the
user — health data should **not** be visible to a club/guide outside that
24-hour pre-departure window for an event the person is actually booked
into. Please make sure the permission model on this data enforces that,
not just the general "authenticated user only" rule.

### Response

**200/201**, no particular shape required by the frontend.

---

## Step 3 — Emergency contact

```
POST /api/v1/profile/emergency-contact/
```

- **Authenticated**.
- Unlike Health, this step is **required** — no skip link, and the UI
  shows a standing warning: "Պարտադիր է: Առանց արտակարգ կապի ուղեկցորդը
  չի իմանա՝ ում զանգել" (required — without this, the guide won't know
  who to call).

### Request

```json
{
  "name": "Նարե Հակոբյան",
  "relationship": "parent",
  "phone": "+374 77 123 456",
  "sms_notifications": true,
  "save_for_future": true
}
```

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `name` | string | **yes** | Trimmed, must be two+ words (first + last name) |
| `relationship` | string | **yes** | One of: `parent`, `spouse`, `sibling`, `friend`, `other` — again, a small fixed set from the frontend content file, confirm against any existing enum |
| `phone` | string | **yes** | Same 8–12 digit format as elsewhere |
| `sms_notifications` | boolean | defaults `true` | "Ուղարկենք SMS, երբ խումբը մեկնի և վերադառնա" (send SMS when the group departs/returns) — this implies an SMS-sending integration tied to actual event departure/return events, which doesn't exist yet; flag if that's a separate piece of work |
| `save_for_future` | boolean | defaults `true` | Implies this record should be reusable/editable later from a settings page, which doesn't exist in the frontend yet either |

### Response

**200/201**. On success the frontend currently redirects **home** (`/`) —
there's no specific booking/payment this flow is attached to, and the
mock's own submit button label ("Շարունակել վճարմանը" — continue to
payment) implies a real payment step that doesn't exist in this generic
flow. If/when this becomes part of an actual booking checkout, the
redirect target will need to change to wherever that payment step lives.
