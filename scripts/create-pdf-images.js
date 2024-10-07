import fs from 'fs';
import { pdfToPng } from 'pdf-to-png-converter';

/**
 * This script creates images of each PDF in the collection by using the pdf2pic library.
 * Images are stored respectively in the /public/:slug/:slug__image.png
 */

const dataFolderPath = './public/data';
const collectionFilePath = './src/data/collection.json';

console.log('Creating PDF images...');
const scribbles = JSON.parse(
  fs.readFileSync(collectionFilePath, 'utf8')
).scribbles;

// while (scribbles.length > 1) scribbles.pop();

createImage();

async function createImage() {
  if (scribbles.length === 0) return;
  const scribble = scribbles.pop();

  const { slug, pageCount } = scribble;
  const folderPath = `${dataFolderPath}/${slug}`;
  const pdfFilePath = `${folderPath}/${slug}.pdf`;

  console.log(`${slug}`);

  const options = {
    disableFontFace: true, // When `false`, fonts will be rendered using a built-in font renderer that constructs the glyphs with primitive path commands. Default value is true.
    useSystemFonts: true, // When `true`, fonts that aren't embedded in the PDF document will fallback to a system font. Default value is false.
    viewportScale: 2.0, // The desired scale of PNG viewport. Default value is 1.0.
    outputFolder: `${folderPath}/export`, // Folder to write output PNG files. If not specified, PNG output will be available only as a Buffer content, without saving to a file.
    outputFileMask: slug, // Mask for output PNG files.
    pagesToProcess: Array.from({ length: pageCount }, (_, i) => i + 1), // Array of page numbers to process. Default value is an empty array.
    strictPagesToProcess: true // When `true`, will throw an error if specified page number in pagesToProcess is invalid, otherwise will skip invalid page. Default value is false.
  };

  await pdfToPng(
    pdfFilePath, // The function accepts PDF file path or a Buffer
    options
  );

  createImage();
}
