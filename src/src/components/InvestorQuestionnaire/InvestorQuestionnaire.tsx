import React, { useState } from 'react';
import {
  InvestorProfile,
  QuestionnaireFormData,
  ShortTermGoal,
  LongTermGoal,
  RiskTolerance,
  ExperienceLevel,
  InvestmentHorizon,
} from '../../types/InvestorProfile';

interface InvestorQuestionnaireProps {
  onComplete: (profile: InvestorProfile) => void;
  onCancel?: () => void;
}

const InvestorQuestionnaire: React.FC<InvestorQuestionnaireProps> = ({
  onComplete,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuestionnaireFormData>({
    shortTermGoals: [],
    longTermGoals: [],
  });

  // Helper function to generate unique IDs
  const generateId = () => `goal-${Date.now()}-${Math.random()}`;

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const profile: InvestorProfile = {
      shortTermGoals: formData.shortTermGoals,
      longTermGoals: formData.longTermGoals,
      constraints: {
        monthlyContribution: formData.monthlyContribution,
        currentSavings: formData.currentSavings,
      },
      riskTolerance: formData.volatilityComfort || 'moderate',
      experienceLevel: formData.experienceLevel || 'beginner',
      investmentHorizon: formData.investmentHorizon || 'medium',
      riskAssessment: {
        marketDropResponse: formData.marketDropResponse || '',
        volatilityComfort: formData.volatilityComfort || 'moderate',
        capitalPreservation: false,
        growthPriority: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    onComplete(profile);
  };

  const addShortTermGoal = (type: ShortTermGoal['type']) => {
    const newGoal: ShortTermGoal = {
      id: generateId(),
      type,
      description: '',
      priority: 'medium',
    };
    setFormData({
      ...formData,
      shortTermGoals: [...formData.shortTermGoals, newGoal],
    });
  };

  const addLongTermGoal = (type: LongTermGoal['type']) => {
    const newGoal: LongTermGoal = {
      id: generateId(),
      type,
      description: '',
      priority: 'medium',
    };
    setFormData({
      ...formData,
      longTermGoals: [...formData.longTermGoals, newGoal],
    });
  };

  return (
    <div className="investor-questionnaire p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex-1 ${step !== 4 ? 'mr-2' : ''}`}
            >
              <div
                className={`h-2 rounded ${
                  step <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
              <p
                className={`text-sm mt-2 text-center ${
                  step === currentStep
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-500'
                }`}
              >
                Step {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Short-term Goals */}
      {currentStep === 1 && (
        <div className="step-content">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Short-term Investment Goals
          </h2>
          <p className="text-gray-600 mb-6">
            What are your goals for the next 1-3 years? Select all that apply.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { type: 'trading', label: 'Active Trading' },
              { type: 'saving', label: 'Saving for Purchase' },
              { type: 'emergency_fund', label: 'Emergency Fund' },
              { type: 'debt_payoff', label: 'Debt Payoff' },
            ].map((goal) => (
              <button
                key={goal.type}
                onClick={() => addShortTermGoal(goal.type as ShortTermGoal['type'])}
                className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left"
              >
                <span className="font-medium text-gray-800">{goal.label}</span>
              </button>
            ))}
          </div>
          {formData.shortTermGoals.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Selected Goals:</h3>
              {formData.shortTermGoals.map((goal) => (
                <div key={goal.id} className="p-3 bg-blue-50 rounded mb-2">
                  {goal.type.replace('_', ' ').toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 2: Long-term Goals */}
      {currentStep === 2 && (
        <div className="step-content">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Long-term Investment Goals
          </h2>
          <p className="text-gray-600 mb-6">
            What are your goals beyond 3 years? Select all that apply.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { type: 'retirement', label: 'Retirement Planning' },
              { type: 'education', label: 'Education Fund' },
              { type: 'wealth_building', label: 'Wealth Building' },
              { type: 'property', label: 'Property Purchase' },
              { type: 'financial_independence', label: 'Financial Independence' },
            ].map((goal) => (
              <button
                key={goal.type}
                onClick={() => addLongTermGoal(goal.type as LongTermGoal['type'])}
                className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left"
              >
                <span className="font-medium text-gray-800">{goal.label}</span>
              </button>
            ))}
          </div>
          {formData.longTermGoals.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Selected Goals:</h3>
              {formData.longTermGoals.map((goal) => (
                <div key={goal.id} className="p-3 bg-blue-50 rounded mb-2">
                  {goal.type.replace('_', ' ').toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 3: Financial Situation */}
      {currentStep === 3 && (
        <div className="step-content">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Financial Situation
          </h2>
          <p className="text-gray-600 mb-6">
            Help us understand your investment capacity.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Contribution Capacity
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="e.g., 1000"
                value={formData.monthlyContribution || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    monthlyContribution: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Savings Available for Investment
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="e.g., 10000"
                value={formData.currentSavings || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentSavings: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Risk Assessment */}
      {currentStep === 4 && (
        <div className="step-content">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Risk Assessment
          </h2>
          <p className="text-gray-600 mb-6">
            Let's understand your risk tolerance and investment experience.
          </p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Experience Level
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={formData.experienceLevel || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experienceLevel: e.target.value as ExperienceLevel,
                  })
                }
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Tolerance
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={formData.volatilityComfort || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    volatilityComfort: e.target.value as RiskTolerance,
                  })
                }
              >
                <option value="">Select risk tolerance</option>
                <option value="conservative">Conservative</option>
                <option value="moderate">Moderate</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Horizon
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={formData.investmentHorizon || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    investmentHorizon: e.target.value as InvestmentHorizon,
                  })
                }
              >
                <option value="">Select investment horizon</option>
                <option value="short">Short-term (< 3 years)</option>
                <option value="medium">Medium-term (3-7 years)</option>
                <option value="long">Long-term (> 7 years)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <div>
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              className="ml-2 px-6 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          )}
        </div>
        <div>
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorQuestionnaire;