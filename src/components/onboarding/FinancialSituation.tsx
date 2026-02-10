import React from 'react';

interface FinancialSituationProps {
  monthlyContribution: number;
  currentSavings: number;
  onChange: (field: 'monthlyContribution' | 'currentSavings', value: number) => void;
}

export const FinancialSituation: React.FC<FinancialSituationProps> = ({
  monthlyContribution,
  currentSavings,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Financial Situation</h3>

      <div className="space-y-2">
        <label htmlFor="monthlyContribution" className="block text-sm font-medium text-gray-700">
          Monthly Contribution Capacity
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="monthlyContribution"
            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
            placeholder="0.00"
            value={monthlyContribution}
            onChange={(e) => onChange('monthlyContribution', parseFloat(e.target.value) || 0)}
          />
        </div>
        <p className="text-sm text-gray-500">How much can you invest monthly?</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="currentSavings" className="block text-sm font-medium text-gray-700">
          Current Savings / Investable Assets
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="currentSavings"
            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
            placeholder="0.00"
            value={currentSavings}
            onChange={(e) => onChange('currentSavings', parseFloat(e.target.value) || 0)}
          />
        </div>
        <p className="text-sm text-gray-500">Total amount currently available to invest.</p>
      </div>
    </div>
  );
};
