'use strict';

/**
 * email service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::email-request.email-request', ({ strapi }) =>  ({
  async sendEmail(data) {
    const { adults, children, arrivalDate, description, email } = data;

    try {
      await strapi.plugins['email'].services.email.send({
        to: 'joshua.1.9.kim@gmail.com',
        from: strapi.config.get('plugin.email.settings.defaultFrom'),
        replyTo: strapi.config.get('plugin.email.settings.defaultReplyTo'),
        subject: 'New Trip Request',
        text: `
          New trip request details:
          Adults: ${adults}
          Children: ${children}
          Arrival Date: ${arrivalDate}
          Client Email: ${email}
          Description: ${description}
        `,
      });

      return { success: true };
    } catch (err) {
      strapi.log.error('Error sending email', err);
      return { success: false, error: err.message };
    }
  },
}));
