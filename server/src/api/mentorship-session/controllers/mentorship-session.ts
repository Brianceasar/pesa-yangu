/**
 * mentorship-session controller
 */

// src/api/mentorship-session/controllers/mentorship-session.ts

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::mentorship-session.mentorship-session', ({ strapi }) => ({
    async find(ctx) {
        const user = ctx.state.user;

        if (!user) {
            return ctx.unauthorized("You must be logged in");
        }

        const roleType = user.role_type;

        const filters: any = {};

        if (roleType === 'customer') {
            filters.customer = user.id;
        } else if (roleType === 'mentor') {
            filters.mentor = user.id;
        }

        ctx.query = {
            ...ctx.query,
            filters,
        };

        const { data, meta } = await super.find(ctx);
        return { data, meta };
    },
}));