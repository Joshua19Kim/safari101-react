'use strict';

/**
 * safaris service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::safaris.safaris');
