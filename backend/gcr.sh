#!/bin/bash
docker build -t proyecto_grupo16_so2-backend .
docker tag proyecto_grupo16_so2-backend gcr.io/$1/proyecto_grupo16_so2-backend
docker push gcr.io/$1/proyecto_grupo16_so2-backend
