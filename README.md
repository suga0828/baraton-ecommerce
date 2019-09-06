# BaratonEcommerce

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `sh script.sh` to build the project. The build artifacts will be stored in the `dist/baraton-ecommerce` directory.

## Por hacer
- Establecer la nomenclaruta de las categorias para saber si debe ajustarse la lógica de filtros por categorías.
- Escribir pruebas unitarias para la lógica de la aplicación con especial atención en: lectura de productos y categorias, filtros y almacenamiento de información en el carrito de compra.
- Unas vez hechas las pruebas implementar Github Actions para automatizar el despliegue de la aplicación.

## Comentarios adicionales

- Los id's de las categorias fueron modificados para que fuesen únicos y compuestos, en función del subnivel donde pudiesen encontrarse. Quedó de esta forma (puede leerse en el archivo categories.json), los demás son análogos: 
  1 Bebidas
    1.1 Gaseosas
      1.1.1 Con azúcar
      1.1.2 Sin azùcar.
- La implementación de los filtros fue un reto, un reto muy interesante principalmente el de categorias. Se Tomó el índice compuesto de las categorias y se procedió al filtrar por la categoría seleccionada: si la categoría del producto comienza de la misma forma que la categoría seleccionada se muestra el resultado, en caso contrario se elimina de los productos mostrados. Se dejó junto a la cantidad del producto el indice compuesto de las categorias (descrito en el anterior párrafo) para mejorar la visualización de los filtros por categorias. 
