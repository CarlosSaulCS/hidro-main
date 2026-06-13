const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const IMG_ROOT = path.join(ROOT, 'img');
const DATA_DIR = path.join(ROOT, 'data');
const OUTPUT = path.join(DATA_DIR, 'catalogos.js');

const CATEGORIES = [
  'AGUA POTABLE',
  'DRENAJE',
  'INDUSTRIA',
  'SISTEMA DE POZOS'
];

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);

function isImage(filePath) {
  return IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

function toWebPath(filePath) {
  return filePath
    .replace(ROOT + path.sep, '')
    .split(path.sep)
    .join('/');
}

function cleanProductName(fileName) {
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+(?:\.\d+)?\s+/g, '')
    .replace(/\(\d+\)$/g, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

function naturalSort(a, b) {
  return a.localeCompare(b, 'es', { numeric: true, sensitivity: 'base' });
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && isImage(fullPath)) {
      files.push(fullPath);
    }
  }

  return files.sort(naturalSort);
}

function buildCatalogForCategory(category) {
  const categoryDir = path.join(IMG_ROOT, category);
  const files = walk(categoryDir);

  const groups = new Map();

  for (const file of files) {
    const relativeToCategory = path.relative(categoryDir, file);
    const parts = relativeToCategory.split(path.sep);

    let productName;

    // Si la imagen está dentro de una carpeta de producto, usamos esa carpeta como producto.
    // Ejemplo: img/AGUA POTABLE/JUNTA GIUBAULT/01.webp
    if (parts.length > 1) {
      productName = parts[0].replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim().toUpperCase();
    } else {
      productName = cleanProductName(path.basename(file));
    }

    if (!productName) continue;

    if (!groups.has(productName)) groups.set(productName, []);
    groups.get(productName).push(toWebPath(file));
  }

  return [...groups.entries()]
    .sort(([a], [b]) => naturalSort(a, b))
    .map(([name, images]) => ({
      name,
      images: images.sort(naturalSort)
    }));
}

const catalogos = Object.fromEntries(
  CATEGORIES.map(category => [category, buildCatalogForCategory(category)])
);

const content = `/*
  Archivo generado automáticamente.
  Ejecuta: node scripts/generar-catalogos.js

  Recomendación:
  - Para carruseles limpios, crea una carpeta por producto y coloca ahí sus imágenes.
  - Ejemplo:
    img/AGUA POTABLE/JUNTA GIUBAULT/01.webp
    img/AGUA POTABLE/JUNTA GIUBAULT/02.webp
*/

window.CATALOGOS = ${JSON.stringify(catalogos, null, 2)};
`;

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
fs.writeFileSync(OUTPUT, content, 'utf8');

console.log(`Catálogo generado: ${OUTPUT}`);
for (const category of CATEGORIES) {
  console.log(`${category}: ${catalogos[category].length} productos`);
}
