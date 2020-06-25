# Open Practice Library Content API

![Pull Requests](https://github.com/openpracticelibrary/opl-content-api/workflows/Pull%20Requests/badge.svg)
![Dev Build](https://github.com/openpracticelibrary/opl-content-api/workflows/Content%20API%20Dev%20Build/badge.svg)

This application uses [Strapi](https://strapi.io/documentation/3.0.0-beta.x), an open source headless CMS written in Node.js.  The admin UI can be completely separated or removed entirely based on build process.

The Content API is intended to be part of a federated Apollo GraphQL service, allowing the extension of its schema in other services.

## Getting Started

Please ensure you're running Node.js > v10 (lts/dubnium).

You will also need a MongoDB running locally or on a host you can reach from your machine.  You can configure the Mongo connection for your dev environment at `config/environments/development/database.json`.  If you want to use an authenticated database in local dev, please use environment variables and configure the `database.json` file accordingly (examples can be seen in the other environments' `database.json` files).

Mongo running in a container is suggested (use [podman](https://podman.io/getting-started/installation) or [docker](https://docs.docker.com/get-docker/)).

Environment variables are required to configure this service to send an email to curators when an AMA question is submitted.  
```
OPL_CONTENT_API_BASE_URL=http://localhost:1337
SENDGRID_API_KEY=insert-real-sendgrid-key-here
AMA_DEST_EMAIL=jibarton@redhat.com
```
If these aren't configured, the service will create the question and log a warning on the email send.

You can run the application locally by cloning the repo and running:
```
npm install
npm run develop
```
The application's admin UI is available at `http://localhost:1337/admin`.

You can check the Strapi documentation above for how to reason about the code, and how to develop within the platform.

## GraphQL

The application exposes a GraphQL API and a GraphQL Playground, where you can read the schema and docs.  You can find that information, if you're running the application locally, at `http://localhost:1337/graphql`, or [here](http://opl-content-api-opl-dev.apps.s44.core.rht-labs.com/graphql).

### Example Queries
- List of Practices
```graphql
query practices {
  practices {
    id
    title
    subtitle
    body {
      whatIs
      whyDo
      howTo
      fullText
    }
    upvotes
    mediaGallery {
      link
    }
  }
}
```
- List of Practices by Tag
```graphql
query tags {
  tags {
    id
    tag
    practices {
      id
      title
      subtitle
      body {
        whatIs
        whyDo
        howTo
      }
      upvotes
      mediaGallery {
        link
      }
    }
  }
}
```
- Full Practice
```graphql
query practice {
  practice(id: "uuid-for-your-article"){
    id
    slug
    title
    subtitle
    coverImage
    authors {
      id
      username
      firstName
      lastName
    }
    createdAt
    updatedAt
    mediaGallery {
      link
    }
    body {
      whatIs
      whyDo
      howTo
      fullText
    }
    resources {
      description
      link
      linkType
    }
    requirements{
      people
      participants
      time
      difficulty
    }
    upvotes
    tags{
      id
      tag
    }
    ama {
      question
      answers {
        answer
      }
    }
  }
}
```
