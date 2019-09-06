# BaratonEcommerce

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `sh script.sh` to build the project. The build artifacts will be stored in the `dist/baraton-ecommerce` directory.

## Comentarios adicionales

- Los id's de las categorias fueron modificados para que fuesen únicos y compuestos, en función del subnivel donde pudiesen encontrarse.
- La implementación de los filtros fue un reto, un reto muy interesante. Se Tomó el índice compuesto de las categorias y se procedió al filtrar por la categoría seleccionada: si la categoría del producto comienza de la misma forma que la categoría seleccionada se muestra el resultado, en caso contrario se elimina de los productos mostrados.
