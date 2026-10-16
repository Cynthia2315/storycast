# StoryCast Research and Planning

## Project Summary
StoryCast is a 3-page accessible storytelling microsite that presents audio and video features in a calm editorial style. The design direction prioritizes semantic HTML, clear hierarchy, accessible media patterns, and a responsive layout that feels intentional on desktop and mobile.

## Audience
- Visitors looking for culture, innovation, and community stories.
- People who prefer reading transcripts or captions instead of relying on media playback.
- Keyboard, screen reader, and low-vision users who need strong structure and visible focus states.

## Information Architecture

### Primary Pages
1. Home
2. Story detail
3. About / Access

### Supporting Story Detail Pages
- `story/voices-of-kigali.html`
- `story/future-of-african-innovation.html`
- `story/artisans-journey.html`

### Sitemap
- Home introduces the brand, featured stories, and categories.
- Story pages provide one story at a time with media, transcript, and related links.
- About / Access explains the mission, accessibility features, and contact paths.

## Content Order

### Home
1. Skip link and primary navigation
2. Hero statement and call to action
3. Featured story cards
4. Category chips
5. Accessibility overview
6. Footer

### Story Detail
1. Skip link and navigation
2. Story banner and metadata
3. Audio or video player
4. Story description
5. Transcript
6. Related stories
7. Footer

### About / Access
1. Mission hero
2. Mission statement
3. Accessibility feature cards
4. Engagement options
5. Contact section
6. Footer

## Visual Direction
- Palette: deep navy, coral, off-white, and dark gray.
- Typography: Poppins for headings, Inter for body text.
- Layout: editorial spacing, card-based sections, and restrained motion.
- Components: rounded cards, pill badges, soft shadows, and clear CTAs.

## Accessibility Plan
- Semantic landmarks: `header`, `nav`, `main`, `article`, `section`, `figure`, and `footer`.
- Media support: transcripts for audio stories, captions for video stories, and downloadable text files.
- Keyboard support: skip link, logical tab order, visible `:focus-visible` styles, and a mobile menu button with `aria-expanded`.
- Contrast: navy text on light backgrounds and coral used with dark text to stay readable.
- Responsive behavior: Grid for page structure, Flexbox for controls and metadata, and container queries for cards.
- ARIA: used only where semantic HTML needs extra context, such as the mobile nav button.

## Build Notes
- Static implementation with vanilla HTML, Sass, CSS, and a small JS file for navigation.
- The Sass source lives in `sass/` with token partials for colors, type, and spacing.
- Compiled CSS is checked in to `css/styles.css` so the site runs without a build step.
- Live story pages embed YouTube videos and pair them with local transcript files for accessibility.

## Accessibility Checklist
- [x] Skip link is present on every page.
- [x] Page landmarks are semantic and consistent.
- [x] Navigation is keyboard operable.
- [x] Focus states are visible and high contrast.
- [x] Audio pages include transcripts.
- [x] Video pages include captions.
- [x] Images have meaningful alt text or clear decorative treatment.
- [x] Typography is readable and scales responsively.
- [x] Color contrast is designed for WCAG AA.
- [x] Cards adapt with Grid, Flexbox, and container queries.

## Local Preview
Open `index.html` directly in a browser, or serve the folder with any static server if you prefer to test relative paths through `http://localhost`.
