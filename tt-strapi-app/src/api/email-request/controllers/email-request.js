'use strict';

/**
 * email-request controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::email-request.email-request', ({ strapi }) => ({
  async send(ctx) {

    const { data } = ctx.request.body;
    if (!data) {
      return ctx.badRequest('Missing "data" payload in the request body');
    }

    const { adults, children, arrivalDate, description, email } = data;

    if (!adults || !arrivalDate || !email) {
      console.log('Missing required fields');
      return ctx.badRequest('Missing required fields');
    }

    try {
      const result = await strapi.service('api::email-request.email-request').sendEmail({
        adults,
        children,
        arrivalDate,
        description,
        email,
      });

      if (result.success) {
        ctx.send({ message: 'Email sent successfully' }, 200);
      } else {
        ctx.throw(500, result.error || 'Failed to send email');
      }
    } catch (err) {
      console.error('Error in send controller:', err);
      ctx.throw(500, err.message || 'An error occurred');
    }
  },
}));
