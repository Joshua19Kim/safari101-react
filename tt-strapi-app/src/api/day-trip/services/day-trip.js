'use strict';

/**
 * day-trip service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::day-trip.day-trip');
