'use strict';

/**
 * meru service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::meru.meru');
