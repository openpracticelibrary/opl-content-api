'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');
const util = require('util');

function getUrlVariable(url, query) {
  url = url.replace(/.*?\?/, '');
  url = url.replace(/_&_/, '_%26_');
  var vars = url.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == query) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query variable %s not found', query);
}

function mergeArrays(...arrays) {
  let jointArray = [];
  arrays.forEach(array => {
    jointArray = [...jointArray, ...array];
  });

  const mergeMap = new Map(jointArray.map(p => [p._id.toString(), p]));
  return mergeMap.values();
}

module.exports = {
  // findByKeyword returns all practices with text matching "keyword" in either the title, subtitle,
  // or tags associated with the practice
  async findByKeyword(ctx) {
    //console.debug('DEBUG findByKeyword: ' + util.inspect(ctx, false, null, true));
    const searchKeyword = getUrlVariable(ctx.context.request.url, '_keyword');
    console.info(`INFO findByKeyword: ${ctx.context.request.url} keyword: ${searchKeyword}`);

    const findQueryPopulateOptions = 
    [
      { path: 'tags' },
      { path: 'authors' },
      { path: 'ama' },
    ];

    const titleMatches = await strapi.query('practice').find({title_contains: searchKeyword}, findQueryPopulateOptions);
    const subtitleMatches = await strapi.query('practice').find({subtitle_contains: searchKeyword}, findQueryPopulateOptions);
    const tag = await strapi.query('tags').findOne({ tag: searchKeyword });
    return mergeArrays(titleMatches, subtitleMatches, tag ? tag.practices : []);
  },
};
