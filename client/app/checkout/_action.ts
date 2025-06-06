/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { SERVER_URI } from '@/constants/constant';
import axios from 'axios';
import { Session } from 'next-auth';

interface FormData {
    name: string;
    email: string;
    paymentMethod: string;
}

export const handleCheckout = async (
    form: FormData,
    selectedPlan: { name: string; price: string },
    role: string,
    session: Session | null
): Promise<boolean> => {
    if (!session || !session.user.accessToken) {
        alert('You must be logged in to complete this action.');
        return false;
    }

    try {
        const response = await axios.post(
            `${SERVER_URI}/orders`,
            {
                fullname: form.name,
                email: form.email,
                plans: selectedPlan.name.toLowerCase(), // e.g., "bronze"
                payment_method: form.paymentMethod,
            },
            {
                headers: {
                    Authorization: `Bearer ${session.user.accessToken}`,
                },
            }
        );

        console.log('✅ Order created:', response.data);
        return true;
    } catch (err: any) {
        console.error('❌ Checkout error:', err?.response?.data || err.message);
        alert('Something went wrong. Please try again.');
        return false;
    }
};
