
# StoryCast

StoryCast is an accessible storytelling microsite built with semantic HTML, Sass, CSS Grid, Flexbox, and a small amount of vanilla JS for the mobile navigation pattern.

## Project Structure

```text
/
|-- index.html
|-- about.html
|-- story/
|   |-- voices-of-kigali.html
|   |-- future-of-african-innovation.html
|   |-- artisans-journey.html
|-- sass/
|   |-- _colors.scss
|   |-- _typography.scss
|   |-- _spacing.scss
|   `-- main.scss
|-- css/
|   `-- styles.css
|-- js/
|   `-- main.js
|-- assets/
|   |-- images/
|   |-- transcripts/
|   |-- captions/
|   `-- media/
|-- docs/
|   |-- research-and-planning.md
|   |-- research-and-planning.pdf
|   `-- sitemap.svg
|-- mockups/
|   |-- home.svg
|   |-- story.svg
|   `-- about.svg
`-- scripts/
    `-- generate-research-pdf.js
```

## Accessibility Checklist

- Skip link on every page.
- Semantic landmarks and heading structure.
- Visible focus states for links, buttons, and form-like controls.
- Mobile navigation with `aria-expanded` and keyboard support.
- Transcripts for audio stories.
- Captions for the video story.
- Meaningful alternative text for informative images.
- High-contrast color palette with readable text and buttons.
- Responsive layouts using Grid, Flexbox, and container queries.
- Accessible fallback text around media elements.

## Running Locally

1. Open `index.html` directly in a browser for a quick preview.
2. If you want to rebuild the CSS from Sass, install dependencies and run the Sass script:

```bash
npm install
npm run build:css
```

3. The research PDF, sitemap diagram, and mockup SVGs live in `docs/` and `mockups/`.

## Notes

- The mockup SVGs are Figma-friendly and can be imported as design references.
- The planning PDF is generated from the repo via `scripts/generate-research-pdf.js`.
- Story pages now embed real YouTube videos with companion transcript files in `assets/transcripts/`.
- The earlier local WAV assets remain in the repo as backups, but the live pages use the YouTube embeds.


