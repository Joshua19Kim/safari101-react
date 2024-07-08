'use strict';

const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController('api::email-request.email-request', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;

    try {
      const result = await strapi.service('api::email-request.email-request').sendEmail(data);

      if (result.success) {
        ctx.send({ message: 'Email sent successfully', messageId: result.messageId });
      } else {
        ctx.badRequest('Failed to send email', { error: result.error });
      }
    } catch (err) {
      console.error('Error in create controller:', err);
      ctx.badRequest('An error occurred', { error: err.message });
    }
  }
}));
