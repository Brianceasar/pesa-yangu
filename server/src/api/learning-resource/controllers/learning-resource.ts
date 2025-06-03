/**
 * learning-resource controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::learning-resource.learning-resource', ({ strapi }) => ({
    async find(ctx) {
        const user = ctx.state.user;
        if (!user) return ctx.unauthorized('Login required');

        ctx.query = {
            ...ctx.query,
            filters: { uploaded_by: user.id },
        };

        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },
}));