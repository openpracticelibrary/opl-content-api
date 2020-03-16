####################################################
# This file is only intended for LOCAL DEVELEPMENT #
####################################################

FROM node:lts
ENV NODE_ENV="production"
ENV DATABASE_HOST="localhost"
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 1337
ENTRYPOINT ["npm", "start"]
