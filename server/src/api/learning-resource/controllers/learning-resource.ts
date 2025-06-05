/**
 * learning-resource controller
 */

// src/api/learning-resource/controllers/learning-resource.ts

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::learning-resource.learning-resource', ({ strapi }) => ({

    // Mentor posts a new learning resource
    async create(ctx) {
        const user = ctx.state.user;

        if (!user || user.role_type !== 'mentor') {
            return ctx.unauthorized("Only mentors can create learning resources.");
        }

        const { title, type, description, file } = ctx.request.body.data;

        try {
            const newResource = await strapi.entityService.create('api::learning-resource.learning-resource', {
                data: {
                    title,
                    type,
                    description,
                    file,
                    uploaded_by: user.id,
                    publishedAt: new Date(), // Mark published immediately if desired
                },
            });

            return ctx.send({ data: newResource });

        } catch (error) {
            strapi.log.error("Error creating learning resource:", error);
            return ctx.internalServerError("Failed to create learning resource.");
        }
    },

    // Mentor gets all their posted learning resources
    async findByMentor(ctx) {
        const user = ctx.state.user;

        if (!user || user.role_type !== 'mentor') {
            return ctx.unauthorized("Only mentors can access their learning resources.");
        }

        try {
            const resources = await strapi.entityService.findMany('api::learning-resource.learning-resource', {
                filters: {
                    uploaded_by: user.id,
                },
                populate: {
                    uploaded_by: {
                        fields: ['id', 'full_name', 'email'],
                    },
                },
            });

            return ctx.send({ resources });

        } catch (error) {
            strapi.log.error("Error fetching mentor resources:", error);
            return ctx.internalServerError("Failed to fetch learning resources.");
        }
    },

}));