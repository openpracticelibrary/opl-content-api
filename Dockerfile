FROM node:lts
RUN apt-get update
RUN apt-get install -y jq
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm update
# Required while upstream changes are still in PR review
RUN npm run patch
RUN jq '.dependencies |= .+ { "@apollo/federation": "^0.15.0" }' node_modules/strapi-plugin-graphql/package.json > tmp.package.json && mv tmp.package.json node_modules/strapi-plugin-graphql/package.json
RUN npm install
# End required for PR review

ENV NODE_ENV="production"
RUN npm run build
EXPOSE 1337
ENTRYPOINT ["npm", "start"]
