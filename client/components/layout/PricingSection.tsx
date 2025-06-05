'use client';

import { useState } from 'react';
import { useEffect } from 'react';

const pricingData = {
  student: [
    {
      tier: 'Bronze',
      price: 'TSh 10,000',
      features: [
        'Access to free resources',
        '1 mentorship session/month',
        'Basic financial tools',
      ],
    },
    {
      tier: 'Silver',
      price: 'TSh 25,000',
      features: [
        'Everything in Bronze',
        '3 mentorship sessions/month',
        'Access to premium articles',
        'Email support',
      ],
    },
    {
      tier: 'Gold',
      price: 'TSh 50,000',
      features: [
        'Everything in Silver',
        'Unlimited mentorship',
        'Personalized budgeting tools',
        'Priority support',
      ],
    },
  ],
  mentor: [
    {
      tier: 'Bronze',
      price: 'TSh 15,000',
      features: [
        'Profile listing on mentor page',
        'Receive mentorship requests',
        'Basic analytics on sessions',
      ],
    },
    {
      tier: 'Silver',
      price: 'TSh 35,000',
      features: [
        'Everything in Bronze',
        'Advanced scheduling tools',
        'Profile boosting',
        'Session insights',
      ],
    },
    {
      tier: 'Gold',
      price: 'TSh 70,000',
      features: [
        'Everything in Silver',
        'Featured mentor placement',
        'Unlimited visibility boosts',
        'One-on-one strategy sessions with admin',
      ],
    },
  ],
};

const PricingSection = () => {
  const [userType, setUserType] = useState<'student' | 'mentor'>('student');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#mentor') setUserType('mentor');
    else if (hash === '#student') setUserType('student');
  }, []);

  return (
    <section className="bg-gray-50 py-16 px-4" id="pricing">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Choose Your Plan</h2>

        {/* Toggle Buttons */}
        <div className="inline-flex bg-white shadow-md rounded-full mb-10 overflow-hidden">
          <button
            className={` px-6 py-2 font-medium ${
              userType === 'student' ? 'bg-blue-600 text-white' : 'text-gray-600'
            }`}
            onClick={() => setUserType('student')}
          >
            For Students
          </button>
          <button
            className={`px-6 py-2 font-medium ${
              userType === 'mentor' ? 'bg-blue-600 text-white' : 'text-gray-600'
            }`}
            onClick={() => setUserType('mentor')}
          >
            For Mentors
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-4">
          {pricingData[userType].map((plan) => (
            <div
              key={plan.tier}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
            >
              <h3 className="text-2xl font-bold text-blue-700">{plan.tier}</h3>
              <p className="text-3xl font-semibold mt-2">{plan.price}</p>
              <ul className="text-left mt-4 mb-6 space-y-2 text-gray-700">
                {plan.features.map((feature, index) => (
                  <li key={index}> {feature}</li>
                ))}
              </ul>
              <a
                href={`/checkout?plan=${plan.tier.toLowerCase()}&role=${userType}`}
                className="border border-primary mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
