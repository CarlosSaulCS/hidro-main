/*
  Configuración de catálogos HidroPlus
  ---------------------------------------------------------------------------
  Por defecto el sitio usa el catálogo local de data/catalogos.js.

  Cuando tengas listo Google Sheets, cambia source a:
  - "google-sheets" si usarás una hoja publicada como CSV
  - "apps-script" si usarás el API de Google Apps Script incluido en este paquete

  IMPORTANTE:
  Las imágenes de Drive deben estar compartidas como:
  "Cualquier persona con el enlace puede ver".
*/

window.CATALOGOS_CONFIG = {
  source: "apps-script",

  // Opción 1: Google Sheets publicado como CSV.
  // Ejemplo:
  // https://docs.google.com/spreadsheets/d/TU_ID_DE_SHEET/gviz/tq?tqx=out:csv&gid=0
  googleSheetsCsvUrl: "",

  // Opción 2: URL del Web App de Google Apps Script.
  // Ejemplo:
  // https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec
  googleAppsScriptUrl: "",

  // Evita que el navegador muestre datos viejos.
  cacheBust: true,

  // Si Google Sheets o Apps Script falla, el sitio usa data/catalogos.js.
  fallbackToLocal: true
};
