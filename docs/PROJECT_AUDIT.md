# Project audit

## Baseline

- Source: `the-dome-sessions-website-prototype`, six stand-alone HTML pages, one shared stylesheet, one small navigation script, and 14 bundled images.
- The prototype was not a Git repository. Before migration, the source state was committed as `cd266f8` (`Checkpoint original static prototype`). The original project root files and supplied materials outside this directory remain untouched.
- The six original prototype routes contained usable content: film overview, trailer, stills, all 21 film credits, four press/festival links, Bandcamp player and three vinyl images, two biographies and portraits, a Heritage Site page and a separate Dome page (the redundant Dome page has since been removed in the revised information architecture), and the production email.
- The README identifies the missing film runtime, year, country, format and languages. These remain unpublished rather than guessed.
- Historical architectural photos were missing from the prototype. The revised Heritage page now uses the owner-supplied Fair-1, Fair-2 and Fair-3 photos; image rights and credit wording still need owner confirmation before launch.
- Trailer and Bandcamp embeds rely on the external services and their privacy / availability settings.
- The source used repeated header/footer markup and a single minified stylesheet; the mobile menu existed but required clearer accessible state and focus behavior.

## Migration risks

- Image field uploads must be committed to the GitHub repository for Workers deployments. This keeps media in the same backup/deployment flow as content. The initial images were copied into `public/uploads/` and referenced in the CMS.
- Cloudflare Free Workers have asset, request and CPU quotas. Keep each uploaded image below 10 MB and the platform's per-file limit. No R2 bucket or external image vendor is needed for this small library.
- GitHub mode and Cloudflare OAuth must be verified with the real Worker and GitHub App before production editing is promised. This local project cannot verify external credentials or account settings.
- Existing image copyright and biography approvals should be confirmed before public launch.

## Implementation direction

Astro provides the public routes, shared layout and responsive design. Keystatic provides five page singletons plus editable festival and press collections. Public pages are generated at build time from local files so the Worker does not need filesystem access at request time. The Keystatic admin and its API remain server routes on the Cloudflare Worker. In production Keystatic uses GitHub mode; content and uploaded images are committed to the repository, and the Cloudflare build/deploy workflow publishes the update.
