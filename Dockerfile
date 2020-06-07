FROM node:lts
RUN apt-get update
RUN apt-get install -y jq
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npx patch-package
RUN jq '.dependencies |= .+ { "@apollo/federation": "^0.15.0" }' node_modules/strapi-plugin-graphql/package.json > tmp.package.json && mv tmp.package.json node_modules/strapi-plugin-graphql/package.json
RUN npm install

RUN NODE_ENV="production" npm run build -- --clean
ENTRYPOINT ["npm", "start"]

