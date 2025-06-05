/**
 * mentorship-session controller
 */

// src/api/mentorship-session/controllers/mentorship-session.ts


import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::mentorship-session.mentorship-session', ({ strapi }) => ({

    // CREATE - Customer books a session with a mentor
    async create(ctx) {
        const user = ctx.state.user;

        if (!user || user.role_type !== 'customer') {
            return ctx.unauthorized("Only customers can create mentorship sessions.");
        }

        const { title, description, session_status, preferred_date, duration, mentor } = ctx.request.body.data;

        if (!mentor) {
            return ctx.badRequest("Mentor ID must be provided.");
        }

        const createdSession = await strapi.entityService.create('api::mentorship-session.mentorship-session', {
            data: {
                title,
                description,
                session_status,
                preferred_date,
                duration,
                customer: user.id,
                mentor,
            },
            populate: ['mentor', 'customer'],
        });

        return { data: createdSession };
    },

    // FIND - Get customer's sessions
    async find(ctx) {
        const user = ctx.state.user;

        if (!user || user.role_type !== 'customer') {
            return ctx.unauthorized("Only customers can access their sessions.");
        }

        try {
            // 1. Fetch sessions booked by the current customer
            const sessions = await strapi.entityService.findMany('api::mentorship-session.mentorship-session', {
                filters: {
                    customer: user.id,
                },
                populate: {
                    mentor: {
                        fields: ['id', 'full_name', 'email', 'bio'],
                    },
                    customer: {
                        fields: ['id', 'full_name', 'email'],
                    },
                },
            });

            return ctx.send({ sessions });

        } catch (error) {
            strapi.log.error("Error fetching sessions/resources:", error);
            return ctx.internalServerError("Something went wrong while fetching data.");
        }
    },
}));