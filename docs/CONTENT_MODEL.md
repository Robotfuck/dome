# Content model

The visual menu appears at `/keystatic/`.

## Page entries

Six Keystatic singletons live under `content/pages/`:

- **The Film — Homepage:** title/tagline, hero and SEO images, synopsis, Vimeo URL, gallery (ordered image/alt/caption/featured records), technical specifications, and ordered role/person credits.
- **The Vinyl:** headings, description, Bandcamp album and player URLs, purchase link, image gallery, tracks, release details and credits.
- **The Team:** ordered team records with name, role, portrait, alt text, short/full biography and links.
- **UNESCO Heritage Site:** hero, introduction, ordered show/hide editorial sections and source references.
- **The Dome:** hero, ordered show/hide editorial sections and gallery.
- **Contact:** production email/name, additional email addresses, inquiry copy and social links.

## Collections

- **Festival selections:** festival, uploaded/supplied logo, year, designation, external URL, numeric order and visibility. The seeded IDFA Frontlight 2026 and Brussels Art Film Festival 2026 are selections, not awards.
- **Press articles:** publication, article title, URL, optional publication date/image, order and visibility. The four source links are migrated.

Arrays support add, remove and reordering in the editor. Empty specifications and optional fields are omitted from public output. Image fields write media to `public/uploads/`.

Editorial bodies are multiline fields with paragraph breaks, intentionally simple for this small site. Existing fixed page structures remain in Astro rather than becoming a general page builder.
