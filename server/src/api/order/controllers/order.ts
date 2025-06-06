/**
 * order controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        const { fullname, email, items, totalamount } = ctx.request.body;

        // 1. Create the order
        const response = await strapi.entityService.create('api::order.order', {
            data: {
                fullname,
                email,
                items,
                totalamount,
                order_status: 'pending',
            },
        });

        // 2. Send HTML email invoice
        await strapi.plugins['email'].services.email.send({
            to: email,
            subject: '🧾 Your Pesa Yangu Invoice',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #4CAF50;">Hello ${fullname},</h2>
          <p>Thank you for your order. Here’s a summary of your purchase from <strong>Pesa Yangu</strong>:</p>
          
          <hr style="margin: 20px 0;" />

          <h3>📦 Order Items:</h3>
          <ul>
            ${items.map((item: string) => `<li>${item}</li>`).join('')}
          </ul>

          <p><strong>Total Amount:</strong> <span style="color: #4CAF50;">$${totalamount}</span></p>
          <p><strong>Status:</strong> Pending</p>

          <hr style="margin: 20px 0;" />

          <p style="font-size: 14px; color: #888;">This is a digital invoice sent from Pesa Yangu. If you have questions, reply to this email.</p>
          <p style="font-size: 13px; color: #aaa;">&copy; ${new Date().getFullYear()} Pesa Yangu, Tanzania</p>
        </div>
      `,
        });

        return response;
    },
}));