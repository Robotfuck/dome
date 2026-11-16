# Deployment guide — Cloudflare Workers

This guide prepares a Cloudflare Workers deployment. Nothing in this project has been deployed or connected to DNS.

## Needed accounts

- A Cloudflare account (Workers Free is the target).
- A GitHub repository for this project and Keystatic content.
- A GitHub App configured for Keystatic GitHub mode.
- Access to `thedomesessions.com` DNS and domain registration when the public domain is ready.

## Build and local check

```sh
npm install
npm run dev
```

Visit `/keystatic/` locally, edit content, and verify it on the public routes. Production mode must use `KEYSTATIC_MODE=github`; never deploy the local editor configuration.

## Cloudflare setup

1. Put the repository on GitHub and connect it to a Cloudflare Worker build/deploy workflow, or deploy with Wrangler.
2. Build with Node 22.22.1 or newer. The project was built here with Node 22.14.0, but that version prints engine warnings for transitive packages in the current lockfile. Use `npm ci` and `npm run build` after choosing the supported build runtime.
3. Set build variables `KEYSTATIC_MODE=github`, `KEYSTATIC_GITHUB_OWNER`, and `KEYSTATIC_GITHUB_REPO`.
4. Configure a GitHub App for the exact production host. The callback URL is `https://<production-host>/api/keystatic/github/oauth/callback`. Grant only the repository permissions Keystatic requests for content commits. Configure the app's homepage to the site/admin URL.
5. Add `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, and `KEYSTATIC_SECRET` as Cloudflare Worker secrets. Add `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` as a public variable if the app setup flow requires it.
6. Check that `/keystatic/` redirects unauthenticated visitors to sign in, authenticated editors can save content, and the deployment publishes the resulting change.
7. Add the custom domain in Workers & Pages → Workers → the deployed Worker → Settings → Domains & Routes. Confirm DNS and HTTPS before announcing the domain.

The Wrangler configuration targets the existing Worker named `dome`. It runs the generated adapter entrypoint at `./dist/_worker.js/index.js` and serves assets from `./dist`. Keep both `_worker.js` and `_routes.json` in `public/.assetsignore`; the build copies that non-empty ignore file to `dist/.assetsignore` so Wrangler excludes Worker internals and route metadata from static asset uploads.

Example manual deploy after build:

```sh
npx wrangler deploy
```

The tracked `wrangler.jsonc` names the Worker and uses the static assets output produced by the Cloudflare adapter. Run a production build before deploying so the generated Worker entrypoint and `dist/.assetsignore` are present.

## Media and cost

Media lives in the repository under `public/uploads/` and is delivered as Worker static assets. No database or R2 bucket is required. Uploads made by the CMS are Git changes and appear publicly after the successful Cloudflare build/deploy. Keep images optimized and modest in size; Cloudflare's current Workers Free limits include 100,000 requests/day, 10 ms CPU/request, 20,000 static asset files per Worker version and 25 MB per static asset file. The current Free Worker plan has no monthly base charge within quotas. A custom domain registration/renewal is separate. Optional R2 has a free allowance but is not currently used.

## Backups and rollback

- Keep the GitHub repository private if unpublished content or raw media needs restricted access.
- Use Git history to recover content files and media; use protected branches and regular repository backups.
- Use Cloudflare's version/deployment history to restore a prior served Worker revision.
- A content rollback should be a Git revert followed by the same successful build/deploy flow.

## Authentication caveat

Keystatic's GitHub OAuth has had Cloudflare-specific issues reported against Astro/Workers versions. An upstream Astro 6 environment-variable compatibility fix is recorded, while the related OAuth issue has distinct reports. Verify the actual deployed `/keystatic/` sign-in, save, image upload, and rebuild flow before depending on it for the administrator. This repository does not contain GitHub/Cloudflare credentials and this flow has not been verified here.
