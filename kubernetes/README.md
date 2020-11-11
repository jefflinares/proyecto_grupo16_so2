# Kubernetes

## Archivos de configuracion Backend

Se utiilizó un Ingress este sirve para exponer un servicio sin necesidad de exponer en el nodo el
mismo, y a este se le apunto a un balanceador de carga nginx la configuración completa de este archivo
se encuentra en este archvo [ingress.yml](back/ingress.yml), y para la aplicación del front se utilizó
el mismo concepto [ingress-front](front/ingress.yml).

Tambien se creo un archivo para levantar el servicio en sí junto a la aplicación del backend en 
el cual se subieron las imágenes a Google Cloud GCR. para la parte del back se utilizo este [archivo]
(back/backend.yml) y del front este [archivo](frontend.yml).

Creando un cluster de 3 nodos que replicaron la aplicación del tipo de deployment.

## Nginx

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.0/deploy/static/provider/cloud/deploy.yaml

> https://kubernetes.github.io/ingress-nginx/deploy/
