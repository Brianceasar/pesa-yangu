/**
 * order router
 */
export default {
    routes: [
        {
            method: 'POST',
            path: '/orders',
            handler: 'order.create', // calls the custom create() in your controller
            config: {
                auth: false, // set to true if you want auth checks, or handle via Strapi roles
                policies: [],
                middlewares: [],
            },
        },
        // Optionally keep other default routes if needed (GET /orders, etc.)
    ],
};  