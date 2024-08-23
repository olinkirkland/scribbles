import fs from 'fs';

/**
 * This script generates the content for a comment that accompanies a Reddit post.
 * The format is Reddit markdown and must include links to each PDF.
 */

const collectionFilePath = './src/data/collection.json';
const commentFilePath = './reddit-comment.md';

console.log('Writing Reddit comment markdown...');
const unsortedScribbles = JSON.parse(
  fs.readFileSync(collectionFilePath, 'utf8')
).scribbles;

const scribbles = unsortedScribbles.reverse().sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

const lines = [];

// 1
lines.push(`*${scribbles[0].description}*`);

// 2
lines.push(
  `[Get the PDF here!](https://olinkirk.land/scribbles/?d=${scribbles[0].slug})`
);

// 3
lines.push(
  `Here's my [website](https://olinkirk.land/scribbles) where you can download up-to-date, free PDFs of all the scenarios I've written.`
);

// 4
lines.push(`Download, play, and share my work however you see fit.`);

// 5+
scribbles.forEach((scribble) => {
  lines.push(
    `[❖ ${scribble.title}](https://olinkirk.land/scribbles/?d=${scribble.slug})`
  );
});

// Write it to a file
fs.writeFileSync(commentFilePath, lines.join('\n\n'));
console.log('  Done!');
