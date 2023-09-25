FROM node:alpine as development

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY ./ ./

CMD ["npm", "run", "start:dev"]