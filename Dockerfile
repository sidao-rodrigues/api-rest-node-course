FROM node:18-alpine3.17

#instalando o bash na imagem usando o apk
RUN apk add --no-cache bash

#Definir o usuário usado no container
USER node

WORKDIR /home/node/app
