# Known issues and remaining work

- The local Astro check and Cloudflare production build pass. The Keystatic route returns its local page shell, but visual editor save/publish workflows still need an end-to-end session.
- Cloudflare account, GitHub repository, GitHub App credentials and production secrets are external setup steps. No deploy, DNS, SSL or public publishing was performed.
- Production Keystatic OAuth and image upload must be verified on the target Cloudflare Worker. Upstream Keystatic/Cloudflare compatibility reports make this an important launch check with the configured account and secrets.
- Film runtime, year, country, genre, original/subtitle languages, aspect ratio, resolution, sound and screening formats were not supplied; the technical information list is intentionally empty.
- Historical architectural images, rights clearance, still-photo credit wording and biographies require owner review before launch.
- Uploaded images are delivered at their uploaded resolution. The editor needs appropriately optimized assets; no automatic image transcoding is configured yet.
- Build output includes Keystatic reader worker notices for `node:path` and `node:fs/promises`, plus a large (about 2.8 MB uncompressed) CMS admin JavaScript chunk. Public static routes build successfully.
- Gallery item removal/reordering and admin persistence have not been exercised through the visual UI.
- A working production update depends on Cloudflare rebuilding the branch/revision that Keystatic writes. Protected branches may require review/merge.
- The initial content is English only. French and Arabic records, translated slugs/metadata and RTL layout are future work.
- Google Fonts remain a third-party request with system font fallbacks; a local font package would remove that dependency.
