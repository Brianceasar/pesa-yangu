'use client';

import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { handleCheckout } from './_action'; // adjust path if needed

const plans = {
  student: {
    bronze: { name: 'Bronze', price: '10000', description: 'Basic mentorship access and resources' },
    silver: { name: 'Silver', price: '25000', description: 'Premium content and 3 mentorship sessions/month' },
    gold: { name: 'Gold', price: '50000', description: 'Unlimited mentorship and personalized tools' },
  },
  mentor: {
    bronze: { name: 'Bronze', price: '15000', description: 'Profile listing and basic analytics' },
    silver: { name: 'Silver', price: '35000', description: 'Advanced scheduling and profile boosting' },
    gold: { name: 'Gold', price: '70000', description: 'Featured mentor and unlimited boosts' },
  },
};

const CheckoutForm = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const role = (searchParams.get('role') as 'student' | 'mentor') || 'student';
  const plan = (searchParams.get('plan') as 'bronze' | 'silver' | 'gold') || 'bronze';
  const selectedPlan = plans[role]?.[plan] || plans.student.bronze;

  const [form, setForm] = useState({ name: '', email: '', paymentMethod: 'mobile money' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem('selectedPlan', JSON.stringify({ role, plan }));
  }, [role, plan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleCheckout(form, selectedPlan, role, session);
    setSubmitted(success);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md mt-10">
      {submitted ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful ✅</h2>
          <p className="text-gray-700 mb-2">
            Thank you for purchasing the {selectedPlan.name} Plan ({role}).
          </p>
          <p className="text-sm text-gray-500">Confirmation sent to {form.email}.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h1 className="text-lg font-bold">
            Checkout - {selectedPlan.name} ({role})
          </h1>
          <p className="text-gray-600">{selectedPlan.description}</p>
          <p className="text-xl font-semibold mb-4">TSh {selectedPlan.price}</p>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 border rounded"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-2 border rounded"
          />

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="mobile money">Mobile Money</option>
            <option value="bank transfer">Bank Transfer</option>
          </select>


          {/* Render additional fields based on payment method if needed */}

          <button
            type="submit"
            className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white font-bold py-2 rounded"
          >
            {loading ? 'Processing...' : 'Complete Payment'}
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;