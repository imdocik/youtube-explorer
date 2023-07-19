FROM node:18.16.1 as builder

WORKDIR /var/www/explorer

COPY --chown=node:node package*.json ./

COPY --chown=node:node . .

RUN npm install

RUN npm run build

RUN chown -R node:node dist

USER node

CMD [ "npm", "run", "start:prod" ]
