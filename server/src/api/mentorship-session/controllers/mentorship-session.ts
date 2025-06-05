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

        const filters: any = {};
        const roleType = user?.role_type;

        if (roleType === 'customer') {
            filters.customer = user.id;
        } else if (roleType === 'mentor') {
            filters.mentor = user.id;
        } else {
            return ctx.forbidden("You don't have permission to view these sessions.");
        }

        ctx.query = {
            ...ctx.query,
            filters,
            populate: ['customer'],
        };

        // Fetch sessions
        const { data, meta } = await super.find(ctx);

        // Fetch resources only if mentor
        let resources = [];
        if (roleType === 'mentor') {
            resources = await strapi.entityService.findMany('api::learning-resource.learning-resource', {
                filters: {
                    uploaded_by: user.id,
                },
                populate: ['uploaded_by'],
            });
        }

        return {
            data,
            meta,
            ...(roleType === 'mentor' && { resources }),
        };
    },
}));
