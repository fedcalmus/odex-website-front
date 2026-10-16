# Public clubs endpoint (needed by the homepage)

The backend has no public clubs endpoint yet — every clubs route today is
authenticated (`/api/v1/club/…` for owners, `/api/v1/admin/clubs/` for admins).
The homepage "Clubs" section (`src/api/clubs.ts`) expects this:

```
GET /api/v1/clubs/?ordering=-created_at&page_size=4
```

- **Public** (`AllowAny`), read-only.
- **Only verified/approved clubs** (`status=approved`, `identity_verified=true`) — the site
  presents every listed club as verified.
- Standard `DefaultPagination` envelope; `count` is the total, shown in the heading
  ("34 ակումբ, բոլորը ստուգված").
- Must support `ordering=-created_at` and `page_size`.
- CORS: allow the website's origin (client components call the API from the browser).

## Item shape

Only fields the card needs — no email/phone/tax id/owner data.

```json
{
  "id": "uuid",
  "name": "Հայաստանի արահետներ",
  "slug": "armenia-trails",
  "logo": "https://api.mozaracing.am/media/clubs/logos/x.png",
  "cover_image": "https://api.mozaracing.am/media/clubs/covers/x.png",
  "activity_types": ["hiking", "climbing"],
  "base_region": "vayots_dzor",
  "events_count": 18,
  "guides_count": 4
}
```

| Field | Notes |
| --- | --- |
| `slug` | **Not on the `Club` model yet.** The site falls back to `/clubs/<id>` until it exists; a slug is what a public, indexable club URL should be. |
| `logo`, `cover_image` | Absolute URLs, or `/media/…` paths (the site resolves them against the API). Served from `/media/` — the site's `next/image` config only allows that path on the API host. |
| `activity_types`, `base_region` | Backend enum values from `apps/common/constants.py`. |
| `events_count` | Suggest: upcoming published events of the club. |
| `guides_count` | Suggest: team members with the guide role. Neither count exists on the model today. |

Every field except `id` may be `null`/missing — the card renders `-` for it.
