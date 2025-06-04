/**
 * rating controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::rating.rating', ({ strapi }) => ({
    async find(ctx) {
        const user = ctx.state.user;
        if (!user) return ctx.unauthorized('Login required');

        const filters: any = {
            $or: [
                { rated_by: user.id },
                { session: { mentor: user.id } } // if you link session → mentor
            ]
        };

        ctx.query = {
            ...ctx.query,
            filters,
        };

        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },
}));