import React from 'react';

interface FinancialHealthScoreProps {
  score: number;
}

export const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ score }) => {
  const getColor = (s: number) => {
    if (s >= 80) return 'text-green-600';
    if (s >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLabel = (s: number) => {
    if (s >= 80) return 'Excellent';
    if (s >= 60) return 'Moderate';
    return 'Concern';
  };

  const circumference = 2 * Math.PI * 45; // radius 45
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col items-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Health Index</h3>

      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-gray-200"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50%"
            cy="50%"
          />
          <circle
            className={`${getColor(score)} transition-all duration-1000 ease-out`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50%"
            cy="50%"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className={`text-4xl font-bold ${getColor(score)}`}>{score}</div>
          <div className="text-sm text-gray-500 font-medium">/100</div>
        </div>
      </div>

      <div className={`mt-4 px-4 py-1 rounded-full text-sm font-semibold bg-opacity-10 ${getColor(score).replace('text-', 'bg-')} ${getColor(score)}`}>
        {getLabel(score)}
      </div>
    </div>
  );
};
