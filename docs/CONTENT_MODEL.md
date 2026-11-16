# Content model

The visual menu appears at `/keystatic/`.

## Page entries

Five Keystatic singletons live under `content/pages/`:

- **The Film — Homepage:** title/tagline, hero and SEO images, rich synopsis and director statement, Vimeo URL, reordered film gallery, technical specifications and the homepage vinyl feature copy.
- **The Vinyl:** headings, rich description, album artwork, Bandcamp album and player URLs, purchase link, image gallery, tracks, release details and release credits.
- **Credits:** ordered profiles for Firas El Hallak and Anthony Tawil plus the editable ordered 21-entry film credits list. Portraits, biographies and links are editable.
- **UNESCO Heritage Site:** main Fair photograph, introduction, three editable recognition benefits, World Heritage in Danger context, Fair gallery and UNESCO references.
- **Contact:** production email/name, additional email addresses, inquiry copy and social links.

## Collections

- **Festival selections:** festival, uploaded/supplied logo, year, designation, external URL, numeric order and visibility. The seeded IDFA Frontlight 2026 and Brussels Art Film Festival 2026 are selections, not awards.
- **Press articles:** publication, article title, URL, optional publication date/image, order and visibility. The four source links are migrated.

Arrays support add, remove and reordering in the editor. Empty specifications and optional fields are omitted from public output. Image fields write media to `public/uploads/`.

Long editorial copy uses the visual Markdoc editor. Existing fixed page structures remain in Astro rather than becoming a general page builder. The Heritage gallery uses the owner-supplied Fair photographs; the main image is Fair-1 and Fair-2/Fair-3 appear in the page gallery.
