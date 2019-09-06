#!/bin/sh
# Script utilizado para compilar la aplicación
# y desplegarla con Angular Github Pages

if [ "$1" = "deploy" ]
  # Deploy with Angular Github Pages
  then
    echo "Inicia despliegue con Angular Github Pages"
    rm -rf dist
    echo "Carpeta /dist borrada, comienzo de la compilación"
    ng build --prod=true --aot=true --buildOptimizer=true --optimization=true --vendorChunk=true --base-href "https://suga0828.github.io/baraton-ecommerce/"
    echo "Aplicación compilada, lista para cargar al servidor"
    npx angular-cli-ghpages --dir=dist/baraton-ecommerce
    echo "Aplicación cargada en la rama gh-pages del repositoro"
    echo "Puede visualizarla en https://suga0828.github.io/baraton-ecommerce/"
else
  rm -rf dist
  echo "Carpeta /dist borrada, comienzo de la compilación"
  ng build --prod=true --aot=true --buildOptimizer=true --optimization=true --vendorChunk=true
fi
