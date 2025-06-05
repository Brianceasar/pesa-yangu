"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const plans = {
    bronze: {
    name: 'Bronze',
    price: 'TSh 10,000',
    description: 'Basic mentorship access and resources',
  },
  silver: {
    name: 'Silver',
    price: 'TSh 25,000',
    description: 'More sessions and premium content',
  },
  gold: {
    name: 'Gold',
    price: 'TSh 50,000',
    description: 'Full access and personalized guidance',
  },
};

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan')as keyof typeof plans;
  const selectedPlan = plans[plan] || plans.bronze;

  const [form, setForm] = useState({ name: '', email: '', paymentMethod: 'visa' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, just simulate submission
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md mt-10">
      {submitted ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful ✅</h2>
          <p className="text-gray-700 mb-2">Thank you for purchasing the {selectedPlan.name} Plan!</p>
          <p className="text-sm text-gray-500">We’ve sent a confirmation email to {form.email}.</p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-2">Checkout - {selectedPlan.name}</h1>
          <p className="text-gray-600 mb-6">{selectedPlan.description}</p>
          <p className="text-xl font-semibold mb-6">{selectedPlan.price}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block font-medium text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded bg-white"
            >
              <option value="visa">Visa</option>
              <option value="paypal">PayPal</option>
              <option value="mobilemoney">Mobile Money (Tigo, Mpesa, Airtel)</option>
            </select>

            {/* Dynamic form fields based on payment method */}
            {form.paymentMethod === 'visa' && (
              <div className="space-y-2">
                <input type="text" placeholder="Card Number" className="w-full border px-4 py-2 rounded" required />
                <input type="text" placeholder="Expiry Date (MM/YY)" className="w-full border px-4 py-2 rounded" required />
                <input type="text" placeholder="CVV" className="w-full border px-4 py-2 rounded" required />
              </div>
            )}

            {form.paymentMethod === 'paypal' && (
              <div className="space-y-2">
                <input type="email" placeholder="PayPal Email" className="w-full border px-4 py-2 rounded" required />
              </div>
            )}

            {form.paymentMethod === 'mobilemoney' && (
              <div className="space-y-2">
                <input type="text" placeholder="Phone Number (07...)" className="w-full border px-4 py-2 rounded" required />
                <select className="w-full border px-4 py-2 rounded">
                  <option value="tigo">Tigo Pesa</option>
                  <option value="mpesa">Vodacom Mpesa</option>
                  <option value="airtel">Airtel Money</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Complete Payment
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;

