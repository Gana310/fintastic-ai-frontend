import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { GoalSelector } from './GoalSelector';
import { FinancialSituation } from './FinancialSituation';
import { RiskToleranceSelector } from './RiskToleranceSelector';
import { InvestorProfile, ShortTermGoal, LongTermGoal, RiskTolerance, ExperienceLevel, InvestmentHorizon } from '../../types/InvestorProfile';
import { submitOnboardingProfile } from '../../api/onboarding';

export const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const profile = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setProfile);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    shortTermGoals: profile?.shortTermGoals || ([] as ShortTermGoal[]),
    longTermGoals: profile?.longTermGoals || ([] as LongTermGoal[]),
    monthlyContribution: profile?.constraints.monthlyContribution || 0,
    currentSavings: profile?.constraints.currentSavings || 0,
    riskTolerance: profile?.riskTolerance || ('moderate' as RiskTolerance),
    experienceLevel: profile?.experienceLevel || ('beginner' as ExperienceLevel),
    investmentHorizon: profile?.investmentHorizon || ('medium' as InvestmentHorizon),
  });

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      void handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSkip = () => {
    navigate('/analysis');
  };

  const handleSubmit = async () => {
    // Construct the full InvestorProfile object
    const profile: InvestorProfile = {
      shortTermGoals: formData.shortTermGoals,
      longTermGoals: formData.longTermGoals,
      constraints: {
        monthlyContribution: formData.monthlyContribution,
        currentSavings: formData.currentSavings,
      },
      riskTolerance: formData.riskTolerance,
      experienceLevel: formData.experienceLevel,
      investmentHorizon: formData.investmentHorizon,
      riskAssessment: {
        marketDropResponse: '',
        volatilityComfort: formData.riskTolerance,
        capitalPreservation: formData.riskTolerance === 'conservative',
        growthPriority: formData.riskTolerance === 'aggressive',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setIsSubmitting(true);
    try {
      // Sync a simplified version of this profile with the backend so the user's
      // goal/horizon/risk tolerance can inform server-side recommendations.
      const backendProfile = await submitOnboardingProfile(profile);
      profile.backendProfileId = backendProfile.id;
    } catch (err) {
      // Non-fatal: keep the locally-saved profile even if the backend sync fails
      console.error('Failed to sync onboarding profile with backend:', err);
    } finally {
      setIsSubmitting(false);
    }

    setProfile(profile);
    navigate('/analysis');
  };

  const toggleShortTermGoal = (goal: ShortTermGoal | LongTermGoal) => {
    const newGoal = goal as ShortTermGoal;
    setFormData((prev) => {
      const exists = prev.shortTermGoals.some((g) => g.id === newGoal.id);
      return {
        ...prev,
        shortTermGoals: exists
          ? prev.shortTermGoals.filter((g) => g.id !== newGoal.id)
          : [...prev.shortTermGoals, newGoal],
      };
    });
  };

  const toggleLongTermGoal = (goal: ShortTermGoal | LongTermGoal) => {
    const newGoal = goal as LongTermGoal;
    setFormData((prev) => {
      const exists = prev.longTermGoals.some((g) => g.id === newGoal.id);
      return {
        ...prev,
        longTermGoals: exists
          ? prev.longTermGoals.filter((g) => g.id !== newGoal.id)
          : [...prev.longTermGoals, newGoal],
      };
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg my-10 border border-gray-100">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2 items-center">
          <span className="text-sm font-medium text-gray-500">Step {step} of {totalSteps}</span>
          <button
            onClick={handleSkip}
            className="text-sm font-medium text-gray-400 hover:text-gray-600 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
          >
            Skip for now
          </button>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[400px] py-4">
        {step === 1 && (
          <GoalSelector
            type="short"
            selectedGoals={formData.shortTermGoals}
            onToggleGoal={toggleShortTermGoal}
          />
        )}
        {step === 2 && (
          <GoalSelector
            type="long"
            selectedGoals={formData.longTermGoals}
            onToggleGoal={toggleLongTermGoal}
          />
        )}
        {step === 3 && (
          <FinancialSituation
            monthlyContribution={formData.monthlyContribution}
            currentSavings={formData.currentSavings}
            onChange={(field, val) => setFormData((prev) => ({ ...prev, [field]: val }))}
          />
        )}
        {step === 4 && (
          <RiskToleranceSelector
            riskTolerance={formData.riskTolerance}
            experienceLevel={formData.experienceLevel}
            investmentHorizon={formData.investmentHorizon}
            onChange={(field, val) => setFormData((prev) => ({ ...prev, [field]: val }))}
          />
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
            step === 1
              ? 'text-gray-300 cursor-not-allowed bg-gray-50'
              : 'text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={isSubmitting}
          className={`px-8 py-2.5 bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-sm hover:shadow focus:ring-4 focus:ring-blue-100 ${
            isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {step === totalSteps ? (isSubmitting ? 'Saving...' : 'Complete Profile') : 'Next Step'}
        </button>
      </div>
    </div>
  );
};
