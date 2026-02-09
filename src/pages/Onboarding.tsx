import React from 'react';
import { OnboardingFlow } from '../components/onboarding/OnboardingFlow';

const Onboarding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Let's Build Your Investor Profile
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Tell us about your goals and we'll tailor our analysis to you.
        </p>
      </div>

      <OnboardingFlow />
    </div>
  );
};

export default Onboarding;
