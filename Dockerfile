FROM node:18-alpine3.17

#instalando o bash na imagem usando o apk
RUN apk add --no-cache bash

#Definir o usuário usado no container
# USER node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
