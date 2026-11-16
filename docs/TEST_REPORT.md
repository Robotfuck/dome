# Test report

Checks for the current five-page revision. No content was saved or changed through the admin interface during verification.

| Test | Steps performed | Result |
|---|---|---|
| Type and Astro diagnostics | `ASTRO_TELEMETRY_DISABLED=1 KEYSTATIC_MODE=local npm run check` | Pass — 16 files, 0 errors, 0 warnings, 0 hints |
| Production build | `ASTRO_TELEMETRY_DISABLED=1 KEYSTATIC_MODE=local npm run build` | Pass — Cloudflare adapter output, five public pages prerendered, Keystatic and API worker routes emitted |
| Homepage edits | Opened the local browser preview and inspected the title, complete supplied synopsis, gallery heading/supporting text, moved credits, vinyl feature text and record photo | Pass — requested content is present; credits are no longer on the homepage |
| Heritage page | Opened `/heritage/` in the local browser and inspected headline, official-list summary, benefit sections, conservation context, source links and image descriptions | Pass — Fair-1 hero and Fair-2/Fair-3 gallery are present; page describes the wider fair complex |
| Credits page | Opened `/team/` and checked navigation label, subtitle, portrait/profile pairing, one-line Anthony name, and full credits | Pass — navigation says Credits, both profiles and all 21 credits render |
| Vinyl page | Opened `/vinyl/` and checked the new statement, removed duplicate intro, album artwork, Bandcamp player frame and Heritage link | Pass — requested text and artwork render |
| Local CMS route | Requested `/keystatic/` from the local Astro server | Pass with limit — HTTP 200 and Keystatic page shell returned; interactive edit/save flow not completed |
| Responsive visual review | Browser-inspected changed sections at 375, 768 and 1440 px | Not verified in this revision; responsive CSS was updated, but multi-width visual inspection remains outstanding |
| CMS save and media workflow | Edit/save content, upload/replace/remove image, reorder gallery, restart server and inspect persistence | Not verified — requires an interactive editor session |
| Production authentication and publish | Sign in with GitHub mode, commit content and confirm Cloudflare rebuild | Not verified — requires GitHub App/repository setup and Cloudflare account configuration |
| Production deployment | Deploy or bind public DNS | Not attempted — deployment was not requested |

The build reports two upstream bundler notices for `node:path` and `node:fs/promises` in Keystatic's reader worker and a large admin JavaScript chunk (about 2.8 MB uncompressed). Public routes build successfully. Production GitHub-mode authentication and content persistence still require end-to-end verification after OAuth and repository setup.
