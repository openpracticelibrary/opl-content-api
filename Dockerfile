####################################################
# This file is only intended for LOCAL DEVELOPMENT #
####################################################

FROM node:lts
RUN apt-get update
RUN apt-get install -y jq
WORKDIR /app
COPY . .

ENV NODE_ENV="production"
RUN npm run build
EXPOSE 1337
ENTRYPOINT ["npm", "start"]
