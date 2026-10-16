const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'docs', 'research-and-planning.pdf');

function escapePdfText(text) {
  return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars) {
      if (current) {
        lines.push(current);
      }
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.length > 0 ? lines : [''];
}

function buildPage(blocks) {
  let y = 742;
  let content = '';

  for (const block of blocks) {
    if (block.blankBefore) {
      y -= block.blankBefore;
    }

    const lines = block.text === '' ? [''] : wrapText(block.text, block.maxChars ?? 78);
    const lineHeight = block.lineHeight ?? 14;
    const font = block.font ?? 'F1';
    const fontSize = block.fontSize ?? 11;
    const blockHeight = Math.max(lineHeight, lines.length * lineHeight);

    content += `BT\n/${font} ${fontSize} Tf\n54 ${y} Td\n`;
    lines.forEach((line, index) => {
      if (index > 0) {
        content += `0 -${lineHeight} Td\n`;
      }
      content += `(${escapePdfText(line)}) Tj\n`;
    });
    content += 'ET\n';

    y -= blockHeight;

    if (block.blankAfter) {
      y -= block.blankAfter;
    } else {
      y -= 4;
    }
  }

  return content;
}

const pages = [
  buildPage([
    { font: 'F2', fontSize: 18, lineHeight: 24, text: 'StoryCast Research and Planning', blankAfter: 12, maxChars: 42 },
    { font: 'F2', fontSize: 13, lineHeight: 18, text: 'Project summary', blankAfter: 4 },
    { text: 'StoryCast is a 3-page accessible storytelling microsite with supporting story detail pages. The design focuses on semantic HTML, transcripts, captions, and calm editorial spacing.', blankAfter: 6 },
    { font: 'F2', fontSize: 13, lineHeight: 18, text: 'Information architecture', blankAfter: 4 },
    { text: '- Home', blankAfter: 0 },
    { text: '- Story detail', blankAfter: 0 },
    { text: '- About / Access', blankAfter: 0 },
    { text: '- Supporting story pages in /story', blankAfter: 6 },
    { font: 'F2', fontSize: 13, lineHeight: 18, text: 'Content order', blankAfter: 4 },
    { text: 'Home: hero, featured stories, categories, accessibility overview, footer', blankAfter: 0 },
    { text: 'Story detail: banner, media player, story copy, transcript, related stories', blankAfter: 0 },
    { text: 'About / Access: mission, accessibility features, engagement, contact', blankAfter: 6 },
    { font: 'F2', fontSize: 13, lineHeight: 18, text: 'Visual direction', blankAfter: 4 },
    { text: '- Palette: deep navy, coral, off-white, and dark gray', blankAfter: 0 },
    { text: '- Typography: Poppins for headings, Inter for body text', blankAfter: 0 },
    { text: '- Layout: editorial spacing, card-based sections, and restrained motion', blankAfter: 0 },
  ]),
  buildPage([
    { font: 'F2', fontSize: 18, lineHeight: 24, text: 'Accessibility and build notes', blankAfter: 12, maxChars: 42 },
    { font: 'F2', fontSize: 13, lineHeight: 18, text: 'Accessibility checklist', blankAfter: 4 },
    { text: '- Skip link on every page', blankAfter: 0 },
    { text: '- Semantic landmarks and headings', blankAfter: 0 },
    { text: '- Keyboard-accessible mobile menu', blankAfter: 0 },
    { text: '- Visible focus states', blankAfter: 0 },
    { text: '- Transcripts for audio stories', blankAfter: 0 },
    { text: '- Captions for video stories', blankAfter: 0 },
    { text: '- Meaningful alt text or decorative treatment', blankAfter: 0 },
    { text: '- WCAG AA contrast targets', blankAfter: 0 },
    { text: '- Grid, Flexbox, and container queries', blankAfter: 6 },
    { font: 'F2', fontSize: 13, lineHeight: 18, text: 'Build notes', blankAfter: 4 },
    { text: '- Static implementation with vanilla HTML, Sass, CSS, and small JS', blankAfter: 0 },
    { text: '- Sass tokens live in sass/_colors.scss, sass/_typography.scss, and sass/_spacing.scss', blankAfter: 0 },
    { text: '- Compiled CSS is checked in to css/styles.css', blankAfter: 0 },
    { text: '- Live story pages embed YouTube videos and pair them with local transcript files', blankAfter: 6 },
    { font: 'F2', fontSize: 13, lineHeight: 18, text: 'Local preview', blankAfter: 4 },
    { text: '- Open index.html directly in a browser, or serve the folder with any static server', blankAfter: 0 },
  ]),
];

const objects = [];
objects.push('1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n');
objects.push('2 0 obj << /Type /Pages /Kids [5 0 R 7 0 R] /Count 2 >> endobj\n');
objects.push('3 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n');
objects.push('4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj\n');

pages.forEach((pageContent, index) => {
  const pageObjId = 5 + index * 2;
  const contentObjId = 6 + index * 2;
  const stream = Buffer.from(pageContent, 'utf8');
  objects.push(
    `${pageObjId} 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjId} 0 R >> endobj\n`
  );
  objects.push(
    `${contentObjId} 0 obj << /Length ${stream.length} >> stream\n${pageContent}endstream endobj\n`
  );
});

let pdf = '%PDF-1.4\n';
const offsets = [0];

for (const object of objects) {
  offsets.push(Buffer.byteLength(pdf, 'utf8'));
  pdf += object;
}

const xrefStart = Buffer.byteLength(pdf, 'utf8');
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += '0000000000 65535 f \n';

for (let i = 1; i <= objects.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
}

pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\n`;
pdf += `startxref\n${xrefStart}\n%%EOF\n`;

fs.writeFileSync(outputPath, Buffer.from(pdf, 'utf8'));
console.log(`Wrote ${outputPath}`);
