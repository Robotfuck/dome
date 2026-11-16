import { config, fields, collection, singleton } from '@keystatic/core';

const image = (label: string) => fields.image({
  label,
  directory: 'public/uploads',
  publicPath: '/uploads/',
  validation: { isRequired: false },
});
const gallery = (label: string) => fields.array(fields.object({
  image: image('Image'),
  alt: fields.text({ label: 'Alternative text' }),
  caption: fields.text({ label: 'Caption', multiline: true }),
  featured: fields.checkbox({ label: 'Featured image' }),
}), { label, itemLabel: (props) => props.fields.caption.value || 'Gallery image' });
const seo = {
  seoTitle: fields.text({ label: 'SEO title' }),
  seoDescription: fields.text({ label: 'SEO description', multiline: true }),
  ogImage: image('Social sharing image'),
};
const heritageBenefits = fields.array(fields.object({
  heading: fields.text({ label: 'Benefit heading' }),
  body: fields.markdoc.inline({ label: 'Explanation' }),
  visible: fields.checkbox({ label: 'Show benefit', defaultValue: true }),
}), { label: 'Why recognition matters', itemLabel: (props) => props.fields.heading.value || 'Benefit' });

const githubMode = process.env.KEYSTATIC_MODE === 'github';
if (process.env.NODE_ENV === 'production' && process.env.KEYSTATIC_MODE !== 'local' && !githubMode) {
  throw new Error('Set KEYSTATIC_MODE=github for protected production CMS access, or KEYSTATIC_MODE=local for an intentional local build.');
}
if (githubMode && (!process.env.KEYSTATIC_GITHUB_OWNER || !process.env.KEYSTATIC_GITHUB_REPO)) {
  throw new Error('KEYSTATIC_GITHUB_OWNER and KEYSTATIC_GITHUB_REPO are required in GitHub mode.');
}

export default config({
  storage: githubMode
    ? { kind: 'github', repo: `${process.env.KEYSTATIC_GITHUB_OWNER}/${process.env.KEYSTATIC_GITHUB_REPO}` }
    : { kind: 'local' },
  singletons: {
    home: singleton({ label: 'The Film — Homepage', path: 'content/pages/home', format: { data: 'yaml' }, schema: {
      ...seo, title: fields.text({ label: 'Film title' }), tagline: fields.text({ label: 'Subtitle / tagline' }), heroImage: image('Hero photograph'), heroAlt: fields.text({ label: 'Hero image alternative text' }),
      introHeading: fields.text({ label: 'Introduction heading' }), fullSynopsis: fields.markdoc.inline({ label: 'Full synopsis' }), directorsStatement: fields.markdoc.inline({ label: 'Director statement' }),
      vimeoUrl: fields.url({ label: 'Vimeo trailer URL' }), galleryHeading: fields.text({ label: 'Gallery heading' }), gallery: gallery('Film gallery'),
      vinylCtaCopy: fields.markdoc.inline({ label: 'Vinyl feature text' }),
      specifications: fields.array(fields.object({ label: fields.text({ label: 'Specification' }), value: fields.text({ label: 'Value' }) }), { label: 'Technical information', itemLabel: (p) => p.fields.label.value || 'Specification' }),
    }}),
    vinyl: singleton({ label: 'The Vinyl', path: 'content/pages/vinyl', format: { data: 'yaml' }, schema: {
      ...seo, title: fields.text({ label: 'Page title' }), subtitle: fields.text({ label: 'Subtitle' }), introHeading: fields.text({ label: 'Record statement' }), description: fields.markdoc.inline({ label: 'Album description' }), albumArtwork: image('Album artwork'),
      bandcampUrl: fields.url({ label: 'Bandcamp album URL' }), bandcampEmbedUrl: fields.url({ label: 'Bandcamp embed URL' }), purchaseUrl: fields.url({ label: 'Purchase link' }), gallery: gallery('Vinyl photographs'),
      trackListing: fields.array(fields.text({ label: 'Track' }), { label: 'Track listing' }), releaseInfo: fields.text({ label: 'Release information', multiline: true }), credits: fields.text({ label: 'Release credits', multiline: true }),
    }}),
    team: singleton({ label: 'Credits', path: 'content/pages/team', format: { data: 'yaml' }, schema: {
      ...seo, title: fields.text({ label: 'Page title' }), subtitle: fields.text({ label: 'Subtitle' }),
      members: fields.array(fields.object({ name: fields.text({ label: 'Name' }), role: fields.text({ label: 'Role' }), portrait: image('Portrait'), alt: fields.text({ label: 'Portrait alternative text' }), shortBio: fields.text({ label: 'Short biography', multiline: true }), biography: fields.markdoc.inline({ label: 'Full biography' }), website: fields.url({ label: 'Website' }), instagram: fields.url({ label: 'Instagram' }), otherLinks: fields.text({ label: 'Other links', multiline: true }) }), { label: 'Team members', itemLabel: (p) => p.fields.name.value || 'Team member' }),
      credits: fields.array(fields.object({ role: fields.text({ label: 'Role' }), person: fields.text({ label: 'Person / organization' }) }), { label: 'Film credits', itemLabel: (p) => `${p.fields.role.value || 'Credit'} — ${p.fields.person.value || ''}` }),
    }}),
    heritage: singleton({ label: 'UNESCO Heritage Site', path: 'content/pages/heritage', format: { data: 'yaml' }, schema: {
      ...seo, title: fields.text({ label: 'Page title' }), subtitle: fields.text({ label: 'Subtitle' }), heroImage: image('Main fair photograph'), heroAlt: fields.text({ label: 'Main image alternative text' }), introduction: fields.markdoc.inline({ label: 'Introduction' }), benefits: heritageBenefits, siteCondition: fields.markdoc.inline({ label: 'Heritage-in-Danger context' }), gallery: gallery('Fair photographs'),
      unescoUrl: fields.url({ label: 'UNESCO listing URL' }), references: fields.array(fields.object({ title: fields.text({ label: 'Source title' }), url: fields.url({ label: 'Source URL' }) }), { label: 'Source references', itemLabel: (p) => p.fields.title.value || 'Reference' }),
    }}),
    contact: singleton({ label: 'Contact', path: 'content/pages/contact', format: { data: 'yaml' }, schema: {
      ...seo, title: fields.text({ label: 'Page title' }), intro: fields.text({ label: 'Introduction', multiline: true }), productionName: fields.text({ label: 'Production / collective' }), productionEmail: fields.text({ label: 'Production email' }), additionalEmails: fields.array(fields.text({ label: 'Email address' }), { label: 'Additional contact emails' }),
      inquiries: fields.text({ label: 'Inquiry types', multiline: true }), socials: fields.array(fields.object({ label: fields.text({ label: 'Platform / label' }), url: fields.url({ label: 'URL' }) }), { label: 'Social media links', itemLabel: (p) => p.fields.label.value || 'Social link' }),
    }}),
  },
  collections: {
    festivals: collection({ label: 'Festival selections', slugField: 'name', path: 'content/festivals/*', format: { data: 'yaml' }, schema: {
      name: fields.slug({ name: { label: 'Festival name' } }), logo: image('Festival graphic'), year: fields.text({ label: 'Edition / year' }), designation: fields.text({ label: 'Selection or award designation' }), url: fields.url({ label: 'External URL' }), order: fields.integer({ label: 'Display order', defaultValue: 0 }), visible: fields.checkbox({ label: 'Visible on site', defaultValue: true }),
    }}),
    press: collection({ label: 'Press articles', slugField: 'title', path: 'content/press/*', format: { data: 'yaml' }, schema: {
      publication: fields.text({ label: 'Publication' }), title: fields.slug({ name: { label: 'Article title' } }), url: fields.url({ label: 'External URL' }), date: fields.text({ label: 'Publication date, if known' }), image: image('Optional image'), order: fields.integer({ label: 'Display order', defaultValue: 0 }), visible: fields.checkbox({ label: 'Visible on site', defaultValue: true }),
    }}),
  },
});
