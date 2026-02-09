import React from 'react';
import { RiskTolerance, ExperienceLevel, InvestmentHorizon } from '../../types/InvestorProfile';

interface RiskToleranceSelectorProps {
  riskTolerance: RiskTolerance;
  experienceLevel: ExperienceLevel;
  investmentHorizon: InvestmentHorizon;
  onChange: (field: string, value: string) => void;
}

const RISK_LEVELS: { id: RiskTolerance; label: string; description: string }[] = [
  { id: 'conservative', label: 'Conservative', description: 'Priority on capital preservation.' },
  { id: 'moderate', label: 'Moderate', description: 'Balance between growth and safety.' },
  { id: 'aggressive', label: 'Aggressive', description: 'Maximizing returns, accepting higher volatility.' },
];

const EXPERIENCE_LEVELS: { id: ExperienceLevel; label: string }[] = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

const HORIZONS: { id: InvestmentHorizon; label: string }[] = [
  { id: 'short', label: 'Short Term (< 3 years)' },
  { id: 'medium', label: 'Medium Term (3-7 years)' },
  { id: 'long', label: 'Long Term (7+ years)' },
];

export const RiskToleranceSelector: React.FC<RiskToleranceSelectorProps> = ({
  riskTolerance,
  experienceLevel,
  investmentHorizon,
  onChange,
}) => {
  return (
    <div className="space-y-8">
      {/* Risk Tolerance */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Risk Tolerance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RISK_LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => onChange('riskTolerance', level.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                riskTolerance === level.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="font-semibold">{level.label}</div>
              <div className="text-sm text-gray-500 mt-1">{level.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Experience Level</h3>
        <div className="flex gap-4 flex-wrap">
          {EXPERIENCE_LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => onChange('experienceLevel', level.id)}
              className={`px-6 py-2 rounded-full border transition-all ${
                experienceLevel === level.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Investment Horizon */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Investment Horizon</h3>
        <div className="flex gap-4 flex-wrap">
          {HORIZONS.map((horizon) => (
            <button
              key={horizon.id}
              onClick={() => onChange('investmentHorizon', horizon.id)}
              className={`px-6 py-2 rounded-full border transition-all ${
                investmentHorizon === horizon.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {horizon.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
