# CMS user guide

## Open the local editor

1. In the project directory run `npm install` once.
2. Run `npm run dev`.
3. Open `http://localhost:4321/keystatic/`.
4. Choose **The Film — Homepage** in the left menu to edit the landing page. Use **Credits** to update the team profiles and full film credits.

Local mode is for the person running the development server. It saves straight to files on that computer. Do not expose local mode on a public host.

## Common edits

- **Homepage headline/tagline:** The Film — Homepage → Film title / Subtitle / tagline. Save, then inspect the public homepage.
- **Hero photo:** The Film — Homepage → Hero photograph. Upload or choose the image, then enter accurate alternative text. Uploads appear in `public/uploads/`.
- **Film gallery:** The Film — Homepage → Film gallery. Add an item, upload/select its image, write alt text and optional caption. Drag items into display order. Remove an item with the entry action.
- **Credits:** Credits → Full film credits. Add a record with role and person/organization, then reorder or remove it. Portraits and biographies are managed in the same entry.
- **Festival:** Festival selections → create/edit the entry. Provide the name, year, exact selection/award wording, destination URL, order and visibility. Keep selections labeled as selections unless an award is confirmed.
- **Press:** Press articles → create/edit an entry. Add publication, article title and destination URL. Leave date blank when unknown.
- **Trailer:** The Film — Homepage → Vimeo trailer URL. Use the official Vimeo URL; the page extracts the Vimeo video number and also shows a direct fallback link.
- **Rich text:** Full synopsis and director statement, Vinyl album description, Credits biographies, Heritage introduction, recognition benefits, and conservation context have a visual rich-text editor. Use its formatting controls for headings, emphasis, links, and lists. Film section titles and labels remain simple text fields.
- **Bandcamp:** The Vinyl → Bandcamp album URL updates the direct link, Bandcamp embed URL updates the player, and Album artwork updates the image displayed alongside the player and homepage vinyl feature. The embed is accepted only when it uses Bandcamp's `EmbeddedPlayer` URL with an album or track ID.
- **Contact:** Contact → Production email / Additional contact emails / Social media links.
- **Heritage photography:** UNESCO Heritage Site → Main fair photograph and Fair photographs. Fair-1 is the current hero, with Fair-2 and Fair-3 in the page gallery. Add alt text and captions as needed.
- **SEO:** Each page entry has SEO title, SEO description and social sharing image fields.

## Saving and publishing

In local mode, Save writes the content/media files to the project immediately. Restarting the dev server does not remove them. Check the public preview and Git diff before committing.

In production, the planned workflow is Keystatic GitHub mode. The editor signs in with GitHub, saves content/media to the repository, and Cloudflare builds the changed revision. Content is public when the connected deployment is successful. Depending on branch protections, content may need a pull request merge before deployment.

## Recover from mistakes

In local mode, use Git to discard an unwanted edit or restore the last committed YAML/image file. In production, revert the content commit or redeploy the prior Cloudflare version. Ask the technical maintainer before deleting files directly from Git history.
