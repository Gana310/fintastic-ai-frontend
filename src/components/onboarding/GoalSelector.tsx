import React from 'react';
import { ShortTermGoal, LongTermGoal } from '../../types/InvestorProfile';

interface GoalSelectorProps {
  type: 'short' | 'long';
  selectedGoals: (ShortTermGoal | LongTermGoal)[];
  onToggleGoal: (goal: ShortTermGoal | LongTermGoal) => void;
}

const SHORT_TERM_OPTIONS = [
  { id: 'trading', label: 'Trading', description: 'Active trading for short-term gains' },
  { id: 'saving', label: 'Saving', description: 'Building savings for specific purchases' },
  { id: 'emergency_fund', label: 'Emergency Fund', description: 'Creating a safety net' },
  { id: 'debt_payoff', label: 'Debt Payoff', description: 'Clearing high-interest debt' },
];

const LONG_TERM_OPTIONS = [
  { id: 'retirement', label: 'Retirement', description: 'Planning for post-work life' },
  { id: 'education', label: 'Education', description: 'Saving for tuition or learning' },
  { id: 'wealth_building', label: 'Wealth Building', description: 'Long-term asset growth' },
  { id: 'property', label: 'Property', description: 'Real estate investment' },
  { id: 'financial_independence', label: 'FIRE', description: 'Financial Independence, Retire Early' },
];

export const GoalSelector: React.FC<GoalSelectorProps> = ({ type, selectedGoals, onToggleGoal }) => {
  const options = type === 'short' ? SHORT_TERM_OPTIONS : LONG_TERM_OPTIONS;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">
        {type === 'short' ? 'Short-Term Goals (0-3 Years)' : 'Long-Term Goals (3+ Years)'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = selectedGoals.some((g) => g.id === option.id);
          return (
            <button
              key={option.id}
              onClick={() => onToggleGoal({ id: option.id, type: option.id as any, description: option.description, priority: 'medium' })}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium text-gray-900">{option.label}</div>
              <div className="text-sm text-gray-500">{option.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
