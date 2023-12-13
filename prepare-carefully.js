import archiver from 'archiver';
import fs from 'fs';

/**
 * This script generates metadata for each PDF file in the data folder.
 * The metadata is merged into the collection.json file.
 */

console.log('Generating metadata ...');
const dataFolderPath = './public/data';
const collectionFilePath = './src/data/collection.json';

const folders = fs.readdirSync(dataFolderPath);

const collection = JSON.parse(fs.readFileSync(collectionFilePath, 'utf8'));
const metadata = {}; // key: slug, value: metadata object

for (const slug of folders) {
  if (slug === 'scribbles-collection.zip') continue; // skip archive
  try {
    const pdfUrl = `${dataFolderPath}/${slug}/${slug}.pdf`;
    const stats = fs.statSync(pdfUrl);
    metadata[slug] = {
      size: stats.size,
      lastModified: stats.mtime
    };
  } catch (error) {
    console.log(`No PDF file found at ${pdfUrl}`);
  }
}

// Merge metadata into collection
for (const item of collection.scribbles) {
  if (metadata[item.slug]) {
    item.size = metadata[item.slug].size;
    item.lastModified = metadata[item.slug].lastModified;
  }
}

fs.writeFileSync(collectionFilePath, JSON.stringify(collection, null, 2));
console.log('  Done!');

/**
 * This script zips all PDF files into a single archive.
 * The archive is saved in the data folder.
 */

console.log('Zipping PDF files ...');
if (fs.existsSync(`${dataFolderPath}/scribbles-collection.zip`))
  fs.unlinkSync(`${dataFolderPath}/scribbles-collection.zip`);

const archive = archiver('zip', { zlib: { level: 9 } });
const output = fs.createWriteStream('public/scribbles-collection.zip');

output.on('close', () => {
  // If there's an existing archive, delete it
  if (fs.existsSync(`${dataFolderPath}/scribbles-collection.zip`))
    fs.unlinkSync(`${dataFolderPath}/scribbles-collection.zip`);

  // Move archive to data folder
  fs.renameSync(
    'public/scribbles-collection.zip',
    `${dataFolderPath}/scribbles-collection.zip`
  );

  // Update the collection.json file (archive.size, archive.lastModified)
  const stats = fs.statSync(`${dataFolderPath}/scribbles-collection.zip`);
  const collection = JSON.parse(fs.readFileSync(collectionFilePath, 'utf8'));
  collection.archive = {
    size: stats.size,
    lastModified: stats.mtime
  };
  fs.writeFileSync(collectionFilePath, JSON.stringify(collection, null, 2));

  console.log('  Done!');
});

archive.on('warning', (err) => {
  console.error(err);
});

archive.pipe(output);

collection.scribbles.forEach((item) => {
  if (item.slug === 'scribbles-collection.zip') return; // skip archive
  archive.file(`${dataFolderPath}/${item.slug}/${item.slug}.pdf`, {
    name: `${toFileName(item.title)}.pdf`
  });
});

archive.finalize();

function toFileName(str) {
  // Remove all characters that aren't a letter, number, dash, or space
  return str.replace(/[^A-Za-z0-9- ]/g, '');
}
