'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

function emailPayload(entity, baseUrl) {
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

    const message = emailPayload(entity, process.env.OPL_CONTENT_API_BASE_URL);
    await strapi.plugins['email'].services.email.send({
      to: process.env.AMA_DEST_EMAIL,
      subject: 'OPL AMA New Question',
      text: message.text,
      html: message.html,
    });

    return sanitizeEntity(entity, { model: strapi.models.questions });
  },
};
