'use strict';

/**
 * safari service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::safari.safari');
