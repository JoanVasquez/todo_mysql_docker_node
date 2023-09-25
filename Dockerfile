FROM node:alpine as development

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY ./ ./

CMD ["npm", "run", "start:dev"]

# RUN npm run build

# FROM node:alpine as staging


# ARG NODE_ENV=staging
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# RUN npm ci --omit=dev

# COPY --from=development /usr/src/app/dist ./dist

# CMD ["node", "dist/index.js"]


# FROM node:alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json .

# RUN npm ci --omit=dev

# COPY --from=development /usr/src/app/dist ./dist

# CMD ["node", "dist/index.js"]