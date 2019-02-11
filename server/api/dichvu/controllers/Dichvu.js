'use strict';

/**
 * Dichvu.js controller
 *
 * @description: A set of functions called "actions" for managing `Dichvu`.
 */

module.exports = {

  /**
   * Retrieve dichvu records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.dichvu.search(ctx.query);
    } else {
      return strapi.services.dichvu.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a dichvu record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.dichvu.fetch(ctx.params);
  },

  /**
   * Count dichvu records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.dichvu.count(ctx.query);
  },

  /**
   * Create a/an dichvu record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.dichvu.add(ctx.request.body);
  },

  /**
   * Update a/an dichvu record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.dichvu.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an dichvu record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.dichvu.remove(ctx.params);
  }
};
