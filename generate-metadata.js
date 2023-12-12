import fs from 'fs';

console.log('Generating metadata ...');
const dataFolderPath = './public/data';
const collectionFilePath = './src/data/collection.json';

const folders = fs.readdirSync(dataFolderPath);

const collection = JSON.parse(fs.readFileSync(collectionFilePath, 'utf8'));
const metadata = {}; // key: slug, value: metadata object

for (const slug of folders) {
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
for (const item of collection) {
  if (metadata[item.slug]) {
    item.size = metadata[item.slug].size;
    item.lastModified = metadata[item.slug].lastModified;
  }
}

fs.writeFileSync(collectionFilePath, JSON.stringify(collection, null, 2));
console.log('  Done!');
