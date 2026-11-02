# Admin club-verification detail view (show everything submitted)

When a club registers via `docs/club-register-api.md`, an admin needs to
review it — and the requirement is that **every piece of data entered
during the 3-step wizard is visible on the verification screen**, not just
a summary. This doc specifies the detail endpoint the admin panel needs.

Note: the admin UI itself lives in a separate app ("outdoor-admin-frontend"
per the comment in `src/content/taxonomy.ts` — not this repo). This doc
only specifies the **data contract** that app's club-verification screen
needs to consume; building that screen is out of scope here.

## Endpoint

```
GET /api/v1/admin/clubs/<id>/
```

(This likely already exists in some form, per `docs/public-clubs-api.md`'s
note that `/api/v1/admin/clubs/` is where admin club data already lives —
this doc specifies what the **detail** response needs to contain so
nothing from the registration wizard is missing from it.)

- **Admin-authenticated only**.
- Must return **every field submitted across all 3 steps** of
  `docs/club-register-api.md`, plus the uploaded documents and a review
  workflow.

## Response shape

```json
{
  "id": "uuid",
  "status": "pending",
  "identity_verified": false,
  "submitted_at": "2026-10-16T14:32:00Z",

  "contact": {
    "name": "Արամ Հակոբյան",
    "email": "info@lernagnats.am",
    "phone": "+374 91 234 567"
  },

  "club": {
    "name": "Լեռնագնաց",
    "legal_name": "«Լեռնագնաց» ՍՊԸ",
    "tin": "02612345",
    "base_region": "kotayk",
    "activity_types": ["hiking"]
  },

  "documents": {
    "insurance_policy": {
      "url": "https://api.mozaracing.am/media/clubs/pending/x/polis_2026.pdf",
      "filename": "polis_lernagnats_2026.pdf",
      "uploaded_at": "2026-10-16T14:30:00Z"
    },
    "guides": [
      {
        "name": "Արմեն Սարգսյան",
        "certificate": {
          "url": "https://api.mozaracing.am/media/clubs/pending/x/armen_first_aid.jpg",
          "filename": "armen_first_aid.jpg",
          "uploaded_at": "2026-10-16T14:31:00Z"
        }
      },
      {
        "name": "Լուսինե Պետրոսյան",
        "certificate": null
      }
    ]
  },

  "review": {
    "reviewed_by": null,
    "reviewed_at": null,
    "decision": null,
    "rejection_reason": null
  }
}
```

### Field notes

| Field | Notes |
| --- | --- |
| `contact.*` | The step-1 contact person — name, email, phone. **Do not omit this** the way the public `/api/v1/clubs/` listing does (per `docs/public-clubs-api.md`, that one deliberately excludes email/phone/tax-id for the public card) — this is the admin-only detail view, the whole point is seeing everything. |
| `club.tin` | Also excluded from the public listing; must be present here. |
| `club.activity_types` | See the taxonomy-mismatch warning in `docs/club-register-api.md` — whatever values actually get stored (legacy 8 or real 19, depending on how that gets resolved) should round-trip here unchanged so the admin sees exactly what was submitted. |
| `documents.insurance_policy` | Must include a usable file URL (so the admin can open/download it) and the original filename (so it's recognizable, matching what the submitter saw in their own upload list). |
| `documents.guides[]` | Zero or more entries. `certificate` is nullable — the wizard allows a guide name with no file attached. Preserve the order the club submitted them in if practical. |
| `review.*` | New fields if they don't already exist on the admin club model: who reviewed it, when, the decision (`approved`/`rejected`), and a rejection reason (free text) — the confirmation screen shown to the applicant promises a result within 2 business days, so whatever drives that notification (see below) needs this data. |

## Review actions (if not already present)

```
POST /api/v1/admin/clubs/<id>/approve/
POST /api/v1/admin/clubs/<id>/reject/   { "reason": "..." }
```

On either action, **notify the contact email** from the registration
(`contact.email` above) — the applicant-facing confirmation screen's own
copy sets this expectation verbatim: *"Ստուգում ենք փաստաթղթերը 2
աշխատանքային օրում: Արդյունքը կգա {email} հասցեին"* ("we're reviewing
within 2 business days, the result will come to {email}"). If this
notification email doesn't exist yet, it's a natural companion piece to
`docs/email-verification-api.md`, same "branded transactional email,
Armenian copy, says what happened and what's next" approach.

## Not in scope here

- The actual admin-panel screen/UI — separate app, separate task.
- Partial/draft submissions ("Վերբեռնել հետո" / upload-later) — see the
  open question in `docs/club-register-api.md` about whether that button
  needs to support an incomplete submission at all. If it does, this
  detail view should make it obvious to the admin that documents are
  still pending rather than simply missing.
