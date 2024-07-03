import archiver from 'archiver';
import { execSync } from 'child_process';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

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

const ignoredFiles = [
  '_work-in-progress',
  'scribbles-collection.zip',
  'scenario-template.docx'
];

for (const slug of folders) {
  if (ignoredFiles.includes(slug)) continue; // skip ignored files
  console.log(`${slug}`);

  // PDF
  const pdfUrl = `${dataFolderPath}/${slug}/${slug}.pdf`;
  try {
    const fileDates = getGitFileDates(pdfUrl);
    const lastModified = fileDates[0];
    const createdAt = fileDates[fileDates.length - 1];
    const stats = fs.statSync(pdfUrl);
    metadata[slug] = {
      size: stats.size,
      createdAt: createdAt,
      lastModified: lastModified
    };
    console.log(`  ├── ${slug}.pdf`);
  } catch (error) {
    console.log(`No PDF file found at ${pdfUrl}`);
  }

  try {
    const file = fs.readFileSync(pdfUrl);
    const loadPdf = await PDFDocument.load(file.buffer);
    const pdf = await loadPdf;
    const pageCount = pdf.getPageCount();
    metadata[slug].pageCount = pageCount;
  } catch (error) {
    console.log(error);
  }

  // DOCX
  const docUrl = `${dataFolderPath}/${slug}/${slug}.docx`;
  try {
    console.log(`  └── ${slug}.docx`);
  } catch (error) {
    console.log(`No DOCX file found at ${docUrl}`);
  }
}

console.table(metadata);

// Merge metadata into collection
for (const item of collection.scribbles) {
  if (metadata[item.slug]) {
    item.size = metadata[item.slug].size;
    item.pageCount = metadata[item.slug].pageCount;
    item.createdAt = metadata[item.slug].createdAt;
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

function getGitFileDates(filePath) {
  try {
    const command = `git log --follow --format="%ad" -- "${filePath}"`;
    const result = execSync(command, { encoding: 'utf-8' });
    const dates = result.trim().split('\n');
    if (dates.length === 0) return null;
    return dates.map((date) => {
      return new Date(date);
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}
