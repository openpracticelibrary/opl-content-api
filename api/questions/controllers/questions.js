'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

const baseUrlMap = {
  development: 'http://opl-content-api-opl-dev.apps.s44.core.rht-labs.com',
  staging: 'http://opl-content-api-opl-staging.apps.s44.core.rht-labs.com',
  production: 'http://opl-content-api-opl-staging.apps.s44.core.rht-labs.com',
};
const baseUrl = baseUrlMap[process.env.NODE_ENV];

const amaDestEmailMap = {
  development: 'openpracticelibraryteam@gmail.com',
  staging: 'openpracticelibraryteam@gmail.com',
  production: 'openpracticelibraryteam@gmail.com',
};
const amaDestEmail = amaDestEmailMap[process.env.NODE_ENV];

function emailPayload(entity) {
  const html = (`
    <p>New Question: <a href="${baseUrl}/admin/plugins/content-manager/collectionType/application::questions.questions/${entity.id}?redirectUrl=/plugins/content-manager/collectionType/application::questions.questions">${entity.question}</a>
    <p><a href="${baseUrl}/admin/plugins/content-manager/collectionType/application::answers.answers">Create Answer</a>
    <p>Questioner: ${entity.questionerName} - ${entity.questionerEmail}
    <p>Created: ${entity.createdAt}
  `);
  return {
    html: html,
    text: html.replace(/<\/?[^>]+(>|$)/g, '')
  };
}

module.exports = {
  // Override default create controller for Questions to send email for question eval and response
  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.questions.create(data, { files });
    } else {
      entity = await strapi.services.questions.create(ctx.request.body);
    }

    const message = emailPayload(entity);
    await strapi.plugins['email'].services.email.send({
      to: amaDestEmail,
      subject: 'OPL AMA New Question',
      text: message.text,
      html: message.html,
    });

    return sanitizeEntity(entity, { model: strapi.models.questions });
  },
};
