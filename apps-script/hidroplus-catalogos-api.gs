/*
  HidroPlus - API de catálogo para Google Sheets
  ---------------------------------------------------------------------------
  Cómo usar:
  1. Crea una hoja de Google Sheets con una pestaña llamada "Productos".
  2. Usa estos encabezados:
     Activo | Categoria | Producto | Descripcion | Imagen 1 | Imagen 2 | Imagen 3 | Imagen 4 | Imagen 5 | Orden
  3. Extensiones > Apps Script.
  4. Pega este código.
  5. Implementar > Nueva implementación > Aplicación web.
  6. Ejecutar como: Tú.
  7. Quién tiene acceso: Cualquier persona.
  8. Copia la URL /exec y pégala en data/catalogos-config.js como googleAppsScriptUrl.
*/

const SHEET_NAME = 'Productos';

function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    return jsonResponse({
      error: true,
      message: `No existe la pestaña "${SHEET_NAME}".`
    });
  }

  const values = sheet.getDataRange().getValues();

  if (values.length < 2) {
    return jsonResponse({
      products: []
    });
  }

  const headers = values[0].map(normalizeHeader);

  const products = values.slice(1)
    .filter(row => row.some(cell => String(cell).trim() !== ''))
    .map(row => {
      const item = {};

      headers.forEach((header, index) => {
        if (!header) return;
        item[header] = row[index];
      });

      return item;
    });

  return jsonResponse({
    updatedAt: new Date().toISOString(),
    products
  });
}

function normalizeHeader(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
