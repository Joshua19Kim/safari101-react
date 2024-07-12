'use strict';

/**
 * email-request router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::email-request.email-request');
