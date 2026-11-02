# Club registration endpoint (3-step wizard + document upload)

The frontend has a public "register a club" wizard at `/clubs/register`
(`src/sections/clubs/ClubRegister/ClubRegisterWizard.tsx`) — three steps
(Account → Club details → Documents) plus a client-only "Submitted"
confirmation screen. No backend is wired up yet: the wizard holds
everything in React state and never calls an API. This doc specifies what's
needed to make it real.

The existing admin clubs endpoints (`/api/v1/admin/clubs/`, per
`docs/public-clubs-api.md`) already model clubs with a
`status`/`identity_verified` concept — this should create a club record in
that same pending state, not a parallel table.

## ⚠️ Read this first: activity taxonomy mismatch

The wizard's "Ուղղություններ" (activities) step currently submits **8
hardcoded values that do NOT match the backend's real
`apps/common/constants.py` activity taxonomy** (confirmed via
`src/content/taxonomy.ts`, which already mirrors that file for other parts
of the site):

**Frontend currently sends one of:** `hiking`, `climbing`, `cycling`,
`water`, `winter`, `air`, `caving`, `planet`

**Backend's real taxonomy has 19 finer-grained values:** `hiking`,
`trail_running`, `cycling`, `climbing`, `zipline`, `skydiving`,
`parachuting`, `paragliding`, `hang_gliding`, `sup_boarding`, `yachting`,
`surfing`, `kayaking`, `rafting`, `canyoneering`, `wakeboarding`, `skiing`,
`snowboarding`, `other` — no `water`/`winter`/`air`/`planet` buckets exist.

This happened because the Figma mock for this screen showed those 8 broader
category chips, and the task was to match the screenshot exactly rather
than use the real taxonomy. **This needs a decision before the endpoint can
validate `activity_types` against the real enum:**

1. Reject the request and ask frontend to switch the chips to the real
   19-value taxonomy (clean fix, mismatched chip set gets replaced), or
2. Backend accepts the 8 legacy values and maps them internally (e.g.
   `water` → `[kayaking, rafting, sup_boarding, surfing, yachting]`), or
3. Backend adds a temporary broader "category" grouping field, separate
   from the real `activity_types` enum.

Also worth flagging: the 8th chip is legible as **"Մոլորակ" ("planet")** in
the source screenshot, which doesn't read as an outdoor activity at all —
possibly a Figma placeholder/lorem artifact rather than intended content.
`region` (the other taxonomy field on this form) has **no such mismatch** —
its 11 values (`yerevan`, `aragatsotn`, `ararat`, `armavir`, `gegharkunik`,
`kotayk`, `lori`, `shirak`, `syunik`, `tavush`, `vayots_dzor`) already match
the real `base_region` enum exactly.

## Endpoint

```
POST /api/v1/club/register/
```

(multipart/form-data — this request includes files)

- **Public** (`AllowAny`).
- Creates: a user account for the contact person (or reuses one if they're
  already signed in — frontend doesn't currently check this, see note
  below), and a club record with `status=pending`,
  `identity_verified=false`.
- Every field below must be stored and must be visible verbatim in the
  admin club-verification screen — see `docs/club-admin-verification-api.md`,
  which is the other half of this feature.

### Note: no session check before this form

The wizard's step 1 asks for a contact person's name/email/phone/password
as if creating a brand-new account, with no check for "are you already
logged in?" This means right now a logged-in user hitting `/clubs/register`
would create a **second, separate account** as the club's contact. Worth
deciding whether step 1 should be skipped/pre-filled for an already
authenticated user — flagging as a product question, not assuming an
answer.

## Request fields

### Step 1 — Account (contact person)

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `contact_name` | string | **yes** | Trimmed, max 80 chars, must be two+ words (first + last name) |
| `email` | string | **yes** | Dot-domain format, must be unique per the usual account-email rules |
| `phone` | string | **yes** (unlike the public sign-up form, phone is **required** here) | 8–12 digits, chars limited to digits/space/`()`/`+`/`-` |
| `password` | string | **yes** | Min 8 chars + at least one digit |

Also requires accepting `agree_to_terms` (checkbox, "Ակումբների
պայմաններին և Գաղտնիության քաղաքականությանը" — note this is **different
wording from the public sign-up's terms checkbox** ("Օգտագործման
պայմաններին"), so if you track terms-version/acceptance type, these may be
two distinct documents).

### Step 2 — Club details

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| `club_name` | string | **yes** | Trimmed, max 80 chars — the public-facing marketing name |
| `legal_name` | string | **yes** | Trimmed, max 120 chars — the registered legal entity name, e.g. `«Լեռնագնաց» ՍՊԸ` |
| `tin` | string | **yes** | Exactly 8 digits (`^\d{8}$`) — Armenia's ՀՎՀՀ / tax ID |
| `base_region` | string | **yes** | One of the 11 region enum values above |
| `activity_types` | string[] | **yes**, min 1 | See the taxonomy mismatch warning above before validating this |

### Step 3 — Documents

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `insurance_policy` | file | **yes** | PDF or JPG, max 10 MB. "Գործող պոլիս՝ կազմակերպչական պատասխանատվության ապահովագրության" (organizational liability insurance policy) |
| `guides` | array of `{ name: string, certificate?: file }` | optional | Zero or more. `name` is free text (a guide's full name), `certificate` is an optional supporting document (PDF/JPG, max 10 MB each) — "Առաջին օգնության և ուղղության հավաստագրեր" (first-aid / route certificates). The frontend lets the user add/remove rows freely; there's no minimum or maximum count enforced client-side. |

The UI has two submit buttons at the end: "Վերբեռնել հետո" (upload
later) and "Ուղարկել ստուգման" (submit for review). Both currently do the
exact same thing client-side (there's no backend to actually defer
anything to) — **the lead copy on that screen promises** "Առանց դրանց
ակումբը չի հրապարակվի, բայց կարող եք վերբեռնել նաև հետո՝ վահանակից" (won't
be published without them, but you can also upload later from the
dashboard). If you want that promise to be real, the endpoint needs to
accept a club submission with `insurance_policy` missing and `status` set
to something like `incomplete`/`awaiting_documents`, plus a way to resume
uploading later (a dashboard that doesn't exist in this frontend yet).
Otherwise, treat `insurance_policy` as required at submit time and let
frontend fix the "upload later" button's behavior to match.

## Response

**201 Created**

```json
{
  "club": {
    "id": "uuid",
    "name": "Լեռնագնաց",
    "legal_name": "«Լեռնագնաց» ՍՊԸ",
    "tin": "02612345",
    "base_region": "kotayk",
    "activity_types": ["hiking"],
    "status": "pending",
    "identity_verified": false,
    "submitted_at": "2026-10-16T14:32:00Z"
  },
  "contact": {
    "id": "uuid",
    "full_name": "Արամ Հակոբյան",
    "email": "info@lernagnats.am"
  }
}
```

The confirmation screen shown after submit says: "Ստուգում ենք
փաստաթղթերը 2 աշխատանքային օրում: Արդյունքը կգա {email} հասցեին:" (we'll
review within 2 business days, the result goes to that email) — so the
contact email needs a result notification once an admin approves/rejects
(see `docs/club-admin-verification-api.md`).

## Errors

| Status | Case |
| --- | --- |
| 400 | Validation failure, field-level, keyed to match the request field names above |
| 409 | `email` already registered as a contact/user |

## Not in scope here

- **Club dashboard** — the confirmation screen's CTA says "Բացել ակումբի
  վահանակը" (open the club dashboard), but no such dashboard exists in
  this frontend. The button currently just links home. Not required for
  this endpoint, flagged so it isn't assumed to exist.
