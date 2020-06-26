'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // findByKeyword returns all practices with text matching "keyword" in either the title, subtitle,
  // or tags associated with the practice
  async findByKeyword(options) {
    const { sort = 'upvotes:desc', start = 0, limit = 100, tags = [], keyword = [] } = options;

    let searchKeyword;
    if (keyword && keyword.length > 0) {
      searchKeyword = keyword.flatMap(word => ([
        { title: { $regex: word, $options: 'i' } },
        { subtitle: { $regex: word, $options: 'i' } },
        { 'body.0.whatIs': { $regex: `${word}`, $options: 'i' } },
        { 'body.0.whyDo': { $regex: `${word}`, $options: 'i' } },
        { 'body.0.howTo': { $regex: `${word}`, $options: 'i' } }
      ]));

      console.info(`INFO findByKeyword: ${keyword}`);
    }

    let tagSearch;
    if (tags && tags.length > 0) {
      tagSearch = tags.map(t => ({ $elemMatch: { tag: t } }));
    }

    const matches = () => {
      if (searchKeyword && tagSearch) return { $or: searchKeyword, tags: { $all: tagSearch } };
      if (searchKeyword) return { $or: searchKeyword };
      if (tagSearch) return { tags: { $all: tagSearch } };

      return {};
    };

    const aggSortOptions = sort.split(':');
    const aggSort = { [aggSortOptions[0]]: aggSortOptions[1].toLowerCase() };

    // populate referenced fields
    const findQueryPopulateOptions =
    [
      { $lookup: { from: 'components_practice_body_bodies', localField: 'body.ref', foreignField: '_id', as: 'body' } },
      { $lookup: { from: 'components_practice_body_media_galleries', localField: 'mediaGallery.ref', foreignField: '_id', as: 'mediaGallery' } },
      { $lookup: { from: 'components_practice_body_resources', localField: 'resources.ref', foreignField: '_id', as: 'resources' } },
      { $lookup: { from: 'tags', localField: 'tags', foreignField: '_id', as: 'tags' } },
      { $lookup: { from: 'questions', localField: 'ama', foreignField: '_id', as: 'ama' } },
      { $lookup: { from: 'users-permissions_user', localField: 'authors', foreignField: '_id', as: 'authors' } },
    ];

    const oneQuery = await strapi
      .query('practice')
      .model
      .aggregate(findQueryPopulateOptions)
      .match(matches())
      .skip(start)
      .limit(limit)
      .sort(aggSort)

    const entities = oneQuery.map(result => {
      if (result) {
        result.body = result.body[0];
        return result;
      }

      return null;
    });

    return entities;
  },
};
