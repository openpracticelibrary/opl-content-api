# Open Practice Library Content API

![Pull Requests](https://github.com/openpracticelibrary/opl-content-api/workflows/Pull%20Requests/badge.svg)

![Dev Build](https://github.com/openpracticelibrary/opl-content-api/workflows/Content%20API%20Dev%20Build/badge.svg)

This application uses [Strapi](https://strapi.io/documentation/3.0.0-beta.x), an open source headless CMS written in Node.js.  The admin UI can be completely separated or removed entirely based on build process.

The Content API is intended to be part of a federated Apollo GraphQL service, allowing the extension of its schema in other services.

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

## GraphQL

The application exposes a GraphQL API and a GraphQL Playground, where you can read the schema and docs.  You can find that information, if you're running the application locally, at `http://localhost:1337/graphql`, or [here](http://opl-cms-opl-dev.apps.s43.core.rht-labs.com/graphql).

### Example Queries
- List of Articles/Practices
```graphql
query articles {
  articles{
    id
    title
    comments {
      id
    }
    upvotes
    image {
      url
    }
  }
}
```
- List of Articles by Tag
```graphql
query tags {
  tags{
    tag
    articles {
      id
      title
      comments {
        id
      }
      upvotes
      image {
        url
      }
    }
  }
}
```
- Full Article
```graphql
query article {
  article(id: "uuid-for-your-article"){
    updatedAt
    title
    subtitle
    author{
      firstName
      lastName
      avatar{
        url
      }
    }
    image{
      url
    }
    body
    Links {
      name
      link
    }
    requirements{
      people
      participants
      time
      difficulty
    }
    RelatedContent {
      name
      link
    }
    relatedImages {
      image{
        url
      }
    }
    upvotes
    comments{
      updatedAt
      username
      comment
    }
    tags{
      id
      tag
    }
  }
}
```
- Add a New Article

There is a createArticle mutation query in `examples/createArticle.json` for you to try, **you will need to swap the various IDs for real ones in your running app for them to map correctly**.  Then you can run:
```shell
curl -X POST \
  http://localhost:1337/graphql \
  -H "Content-Type: application/json" \
  -d @examples/createArticle.json
```
- Add a New Image

There is a createImage mutation query in `examples/createImage.json`, however **you will need to copy the contents into your curl command/postman form data**.  The command will look like this:
```shell
curl -X POST \
  http://localhost:1337/graphql \
  -H "Content-Type: multipart/form-data" \
  -F 'operations={"query": "mutation ($imageUpload1: Upload!) { upload( file: $imageUpload1) { id, url } }","variables": {"imageUpload1": null}}' \
  -F 'map={ "z_image1": ["variables.imageUpload1"] }' \
  -F 'z_image1=@examples/mobius-loop-logo.svg'
```

## Swagger API docs

You can find a Swagger API document, for more traditional API requests, locally at `http://localhost:1337/documentation/v1.0.0#/`, or [here](http://opl-cms-opl-dev.apps.s43.core.rht-labs.com/documentation/v1.0.0#/).
