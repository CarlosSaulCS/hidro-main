# Catálogos HidroPlus con Google Sheets + Drive

Este paquete deja el catálogo listo para funcionar de dos formas:

1. **Modo local**, usando `data/catalogos.js`.
2. **Modo Google Sheets + Drive**, para que el cliente pueda agregar productos e imágenes desde una hoja de cálculo.

El sitio conserva el catálogo local como respaldo. Si Google Sheets falla, se puede seguir mostrando lo que ya existe en `data/catalogos.js`.

---

## Archivos que debes reemplazar o agregar

Reemplaza:

```txt
index.html
styles.css
README_CATALOGOS.md
```

Agrega o reemplaza:

```txt
data/catalogos.js
data/catalogos-config.js
scripts/generar-catalogos.js
apps-script/hidroplus-catalogos-api.gs
docs/plantilla-productos.csv
docs/INSTRUCCIONES_GOOGLE_SHEETS.md
```

---

## Cómo funciona

La página lee productos con esta estructura:

```txt
Categoría
Producto
Descripción
Imagen 1
Imagen 2
Imagen 3
Activo
Orden
```

Si un producto tiene una sola imagen, aparece normal.

Si tiene dos o más imágenes, aparece como carrusel con flechas.

Las imágenes pueden venir de Google Drive siempre que estén compartidas como:

```txt
Cualquier persona con el enlace puede ver
```

---

## Opción rápida: usar catálogo local

Por defecto `data/catalogos-config.js` viene así:

```js
window.CATALOGOS_CONFIG = {
  source: "local"
};
```

Con eso el sitio usa `data/catalogos.js`.

---

## Opción recomendada: Google Sheets + Drive

### 1. Crear Google Sheets

Crea una hoja con una pestaña llamada:

```txt
Productos
```

Usa estos encabezados:

```txt
Activo
Categoria
Producto
Descripcion
Imagen 1
Imagen 2
Imagen 3
Imagen 4
Imagen 5
Orden
```

Puedes importar el archivo:

```txt
docs/plantilla-productos.csv
```

---

### 2. Subir imágenes a Drive

En Drive crea carpetas por categoría o por producto.

Ejemplo:

```txt
Agua Potable
  Junta Gibault
    foto 1
    foto 2
    foto 3
```

Cada imagen debe compartirse como:

```txt
Cualquier persona con el enlace puede ver
```

Luego pega cada link en las columnas `Imagen 1`, `Imagen 2`, etc.

---

### 3. Conectar con Apps Script

Abre tu Google Sheets y entra a:

```txt
Extensiones > Apps Script
```

Pega el código de:

```txt
apps-script/hidroplus-catalogos-api.gs
```

Después entra a:

```txt
Implementar > Nueva implementación > Aplicación web
```

Configura:

```txt
Ejecutar como: Tú
Quién tiene acceso: Cualquier persona
```

Copia la URL que termina en `/exec`.

---

### 4. Activar la conexión en la página

Edita:

```txt
data/catalogos-config.js
```

Cambia esto:

```js
source: "local",
```

por esto:

```js
source: "apps-script",
```

Y pega la URL:

```js
googleAppsScriptUrl: "https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec",
```

---

## Forma alternativa: Google Sheets publicado como CSV

También puedes publicar la hoja como CSV y pegar la URL en:

```js
source: "google-sheets",
googleSheetsCsvUrl: "URL_DEL_CSV",
```

Pero la opción de Apps Script es más limpia y controlada.

---

## Columnas aceptadas

El sistema reconoce estos campos:

```txt
Activo / Estado / Visible
Categoria / Catalogo / Seccion / Tipo
Producto / Nombre / Nombre Producto
Descripcion / Detalle
Imagen 1 / Imagen 2 / Imagen 3...
Foto 1 / Foto 2 / Foto 3...
Orden
```

Para ocultar un producto, en `Activo` puedes poner:

```txt
NO
```

Para mostrarlo:

```txt
SI
```

---

## Nota importante

Google Sheets actualiza la información, pero puede tardar unos segundos en reflejar cambios dependiendo del navegador y caché.

El archivo `data/catalogos-config.js` incluye `cacheBust: true` para reducir ese problema.
