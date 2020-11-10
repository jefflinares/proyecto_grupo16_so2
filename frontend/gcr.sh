#!/bin/bash
docker build -t proyecto_grupo16_so2-frontend .
docker tag proyecto_grupo16_so2-frontend gcr.io/$1/proyecto_grupo16_so2-frontend
docker push gcr.io/$1/proyecto_grupo16_so2-frontend
