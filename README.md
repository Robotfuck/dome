# The Dome Sessions — Astro + Keystatic

This project migrates the original six-page prototype to an Astro website with a visual Keystatic CMS. The original HTML prototype was checkpointed in Git before migration (`cd266f8`).

## Local development

```sh
npm install
npm run dev
```

Open `http://localhost:4321/` for the website and `http://localhost:4321/keystatic` for the local CMS. Content is stored as YAML in `content/`; CMS uploads go to `public/uploads/`.

## Cloudflare target

Cloudflare Workers is the planned hosting platform. Public pages are built as static output. Keystatic admin/API routes are served by the Cloudflare adapter. Production must use GitHub mode; see [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md).

## Documentation

- [Project audit](docs/PROJECT_AUDIT.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Content model](docs/CONTENT_MODEL.md)
- [CMS user guide](docs/CMS_USER_GUIDE.md)
- [Deployment guide](docs/DEPLOYMENT_GUIDE.md)
- [Test report](docs/TEST_REPORT.md)
- [Known issues](docs/KNOWN_ISSUES.md)
