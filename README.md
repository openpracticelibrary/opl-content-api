# Open Practice Library CMS

A headless CMS for Open Practice Library v2.  This application uses [Strapi](https://strapi.io/documentation/3.0.0-beta.x), an open source headless CMS written in Node.js.  The admin UI can be completely separated or removed entirely based on build process.

## Getting Started

Please ensure you're running Node.js > v10 (lts/dubnium).

You will also need a MongoDB running locally or on a host you can reach from your machine.  You can configure the Mongo connection for your dev environment at `config/environments/development/database.json`.  If you want to use an authenticated database in local dev, please use environment variables and configure the `database.json` file accordingly (examples can be seen in the other environments' `database.json` files).

You can run the application locally by cloning the repo and running:
```
npm install
npm run develop
```
The application's admin UI is available at `http://localhost:1337/admin`.

You can check the Strapi documentation above for how to reason about the code, and how to develop within the platform.

## API Documentation

The application exposes a GraphQL API and a GraphQL Playground, where you can read the schema and docs.  You can find that information, if you're running the application locally, at `http://localhost:1337/graphql`, or [here](http://open-practice-library-cms-opl-dev.apps.s43.core.rht-labs.com/graphql).

You can find a Swagger API document, for more traditional API requests, locally at `http://localhost:1337/documentation/v1.0.0#/`, or [here](http://open-practice-library-cms-opl-dev.apps.s43.core.rht-labs.com/documentation/v1.0.0#/).

