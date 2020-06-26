module.exports = {
  query: `
    practicesByKeyword(sort: String, limit: Int, start: Int, tags: [String], keyword: [String]): [Practice]!
  `,
  resolver: {
    Query: {
      practicesByKeyword: {
        description: 'Return all practices with a keyword match in title, subtitle, or tags',
        resolverOf: 'application::practice.practice.findByKeyword',
        resolver: async ( obj, options ) => {
          const entities = await strapi.controllers.practice.findByKeyword(options);
          return entities;
        },
      },
    },
  },
};
