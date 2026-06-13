# Instrucciones para administrar productos desde Google Sheets

## Estructura de la hoja

Crea una pestaña llamada:

```txt
Productos
```

Con estas columnas:

```txt
Activo | Categoria | Producto | Descripcion | Imagen 1 | Imagen 2 | Imagen 3 | Imagen 4 | Imagen 5 | Orden
```

## Cómo agregar un producto

Llena una fila por producto.

Ejemplo:

```txt
Activo: SI
Categoria: Agua Potable
Producto: Junta Gibault
Descripcion: Junta para sistemas hidráulicos.
Imagen 1: link de Drive
Imagen 2: link de Drive
Imagen 3: link de Drive
Orden: 1
```

## Si el producto tiene una sola imagen

Solo llena `Imagen 1`.

## Si el producto tiene varias imágenes

Llena `Imagen 1`, `Imagen 2`, `Imagen 3`, etc.

La página las mostrará como carrusel.

## Cómo ocultar un producto

En la columna `Activo`, escribe:

```txt
NO
```

## Cómo mostrar un producto

En la columna `Activo`, escribe:

```txt
SI
```

## Categorías válidas

Usa una de estas:

```txt
Agua Potable
Drenaje
Industria
Sistema de Pozos
```

## Requisito de Drive

Cada imagen debe estar compartida como:

```txt
Cualquier persona con el enlace puede ver
```

Si no está compartida así, la imagen puede no aparecer en la página.
