# Actualización de catálogos HidroPlus

Este paquete separa los productos del `index.html` y los mueve a:

```txt
data/catalogos.js
```

## Archivos que debes reemplazar o agregar

1. Reemplaza `index.html`
2. Reemplaza `styles.css`
3. Agrega la carpeta `data/` completa
4. Opcional: agrega la carpeta `scripts/` si quieres generar catálogos automáticamente desde las carpetas de imágenes

## Cómo agregar un producto manualmente

Edita `data/catalogos.js` y agrega un producto en la categoría correcta:

```js
{
  name: "NOMBRE DEL PRODUCTO",
  images: [
    "img/AGUA POTABLE/NOMBRE DEL PRODUCTO/01.webp",
    "img/AGUA POTABLE/NOMBRE DEL PRODUCTO/02.webp"
  ]
}
```

Si solo tiene una imagen:

```js
{
  name: "NOMBRE DEL PRODUCTO",
  images: [
    "img/AGUA POTABLE/NOMBRE DEL PRODUCTO/01.webp"
  ]
}
```

## Cómo organizar carruseles

Lo más recomendable es crear una carpeta por producto:

```txt
img/
  AGUA POTABLE/
    JUNTA GIUBAULT/
      01.webp
      02.webp
      03.webp
```

Todas las imágenes dentro de la carpeta del producto aparecerán como carrusel.

## Generar catálogo automáticamente

Desde la terminal, dentro de la carpeta principal del proyecto:

```bash
node scripts/generar-catalogos.js
```

El script lee estas carpetas:

```txt
img/AGUA POTABLE
img/DRENAJE
img/INDUSTRIA
img/SISTEMA DE POZOS
```

y genera automáticamente:

```txt
data/catalogos.js
```

## Nota importante

El sitio conserva compatibilidad con las rutas actuales de las imágenes. No necesitas cambiar las imágenes existentes para que funcione.
