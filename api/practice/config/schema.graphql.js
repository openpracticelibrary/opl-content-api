const util = require('util');

module.exports = {
  query: `
    practicesByKeyword(keyword: String): [Practice]!
  `,
  resolver: {
    Query: {
      practicesByKeyword: {
        description: 'Return all practices with a keyword match in title, subtitle, or tags',
        resolverOf: 'application::practice.practice.findByKeyword',
        resolver: async (obj, options, ctx ) => {
          const entities = strapi.controllers.practice.findByKeyword(ctx);
          return entities;
        },
      },
    },
  },
};