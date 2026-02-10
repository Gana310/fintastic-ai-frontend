import React from 'react';

interface RecommendationCardProps {
  recommendation: {
    action: 'Buy' | 'Hold' | 'Sell';
    summary: string;
    details: string;
  };
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const getActionColor = (action: string) => {
    switch (action) {
      case 'Buy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Sell':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">AI Verdict</h3>
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getActionColor(recommendation.action)}`}>
            {recommendation.action}
          </span>
        </div>

        <div className="prose max-w-none text-gray-700">
          <p className="font-semibold text-lg mb-3 leading-relaxed">
            {recommendation.summary}
          </p>
          <div className="h-px bg-gray-100 my-4"></div>
          <p className="text-gray-600 text-base leading-7">
            {recommendation.details}
          </p>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3 text-xs text-gray-400 font-medium">
        Disclaimer: This analysis is machine-generated and should not be considered as personalized financial advice.
      </div>
    </div>
  );
};
