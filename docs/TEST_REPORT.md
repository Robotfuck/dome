# Test report

Checks run on the local prototype workspace. No content was saved or changed through the admin interface during verification.

| Test | Steps performed | Result |
|---|---|---|
| Source recovery | Created Git checkpoint `cd266f8` before the migration; retained the six original HTML pages and original assets | Pass |
| Type and Astro diagnostics | `ASTRO_TELEMETRY_DISABLED=1 KEYSTATIC_MODE=local npm run check` after the final CMS changes | Pass — 17 files, 0 errors, 0 warnings, 0 hints |
| Production build | `ASTRO_TELEMETRY_DISABLED=1 KEYSTATIC_MODE=local npm run build` | Pass — Cloudflare adapter output, all six public pages prerendered, Keystatic and API worker routes emitted |
| Rich-text output | Inspected the generated homepage HTML for the seeded Markdoc synopsis | Pass — content renders as HTML during build; no client-side public-page rendering is required |
| Admin route response | Requested `/keystatic/` from the local Astro server | Pass with limit — HTTP 200 and Keystatic page shell returned; no end-to-end editor session completed |
| Public routes and responsive layout | Browser-inspected all six public pages at 375, 768 and 1440 px; checked route headings, images, overflow, and mobile menu | Pass — no horizontal overflow or broken images observed; mobile menu exposes six links |
| Content editing and persistence | Edit and save CMS content, restart server, inspect the changed public page | Not verified — requires an interactive editor session |
| Image workflow | Upload/replace/remove an image, set metadata, reorder gallery and check persistence | Not verified — requires an interactive editor session |
| Credits and links | Add/remove a credit and change Vimeo/Bandcamp destinations in the editor | Not verified — requires an interactive editor session |
| Production authentication | Test sign-in and commits through GitHub mode on a Cloudflare Worker | Not verified — GitHub OAuth/repository secrets and the Cloudflare account are external setup steps |
| Cloudflare deployment | Deploy or bind a public domain | Not attempted — deployment was not authorized and the account is still being prepared |

The build reports two upstream bundler notices for `node:path` and `node:fs/promises` in Keystatic's reader worker, and a large admin JavaScript chunk (about 2.8 MB uncompressed). The static public routes build successfully. Production GitHub-mode auth and persistence still need end-to-end verification after OAuth and repository setup.
