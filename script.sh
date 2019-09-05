#!/bin/sh
# Script utilizado para el despliegue de la aplicación
# con Angular Github Pages

echo "Inicia despliegue con Angular Github Pages"
rm -rf dist
echo "Carpeta /dist borrada. Comienzo de la compilación"
ng build --prod=true --aot=true --buildOptimizer=true --optimization=true --vendorChunk=true --base-href "https://suga0828.github.io/baraton-ecommerce/"
echo "Aplicación compilada. Lista para cargar al servidor"
npx angular-cli-ghpages --dir=dist/baraton-ecommerce
echo "Aplicación cargada en la rama gh-pages del repositoro"
echo "Puede visualizarla en https://suga0828.github.io/baraton-ecommerce/"
