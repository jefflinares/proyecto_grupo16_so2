#!/bin/bash
docker login 
docker build -t web-proyecto-sopes2 .
docker tag web-proyecto-sopes2 $1/web-proyecto-sopes2
docker push $1/web-proyecto-sopes2
