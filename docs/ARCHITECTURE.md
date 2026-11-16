# Architecture

## Runtime

- Astro 5 with TypeScript and the Cloudflare adapter.
- Static generation for the five public pages (Film, Vinyl, Credits, Heritage Site and Contact), sitemap and robots file. The redundant Dome-only page was removed; the Dome remains part of the Heritage Site story.
- Cloudflare Worker routes for Keystatic's admin and API. The project uses the Cloudflare Workers free tier target; it does not require a database.
- Shared Astro layout and components live in `src/layouts/` and `src/components/`.

## Publishing path

Local development uses Keystatic local mode at `/keystatic/` and writes YAML under `content/` plus uploaded files under `public/uploads/`. Production must set `KEYSTATIC_MODE=github`. GitHub mode uses a GitHub App to authenticate the editor and write content/media to the configured repository. A content commit/merge triggers the Cloudflare build, which regenerates the public pages. A commit is not necessarily live until the connected build/deploy completes.

The repository is the content source of truth. Git history provides content rollback; Cloudflare deployment history provides serving rollback. Back up the repository and protect the production branch.

## Media

- Shipped/supplied images are preserved in `assets/` and copied to `public/uploads/` for CMS selection.
- New Keystatic image uploads target `public/uploads/` with public URL prefix `/uploads/`.
- Uploaded files become Git-tracked repository content and then Cloudflare Worker static assets on deployment. There is no separate runtime disk, so changes survive a redeploy by residing in Git.
- Current image markup sets descriptive alt text, lazy loads offscreen imagery and gives the hero high fetch priority. Gallery frames reserve an aspect ratio. Uploaded originals are not transcoded; prepare web-sized JPEG/WebP images before upload. Use a target below 10 MB per image (and always below Cloudflare's current per-file asset cap).

## SEO and language readiness

Each page has editable SEO title/description and social image fields, canonical links use the intended `https://thedomesessions.com` domain, and Astro sitemap plus `public/robots.txt` are configured. Copy stays in content files rather than shared components, leaving a clean path for future translated records. The site currently publishes English only; no incomplete language switcher or invented translations are included. RTL layout is not yet implemented.

## Limits / security

Do not deploy production with local CMS mode. The configuration fails a normal production build if `KEYSTATIC_MODE` is missing, and GitHub mode requires a repository owner and name. Store the OAuth client secret and Keystatic secret in Cloudflare Worker secrets. Never put credentials in YAML, source control, or browser-visible environment variables. `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` is public app metadata, not a secret.
