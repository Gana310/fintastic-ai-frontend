import React from 'react';

interface GrowthProjectionsProps {
  projections: {
    year3Growth: number;
    year5Growth: number;
    year3Price: number;
    year5Price: number;
  };
}

export const GrowthProjections: React.FC<GrowthProjectionsProps> = ({ projections }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col items-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Growth Projections</h3>

      <div className="flex w-full justify-around space-x-6">
        {/* 3 Year */}
        <div className="flex-1 bg-blue-50 rounded-xl p-4 text-center transition-all hover:bg-blue-100">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">3-Year Forecast</div>
          <div className="mt-2 text-3xl font-bold text-blue-600">
            {projections.year3Growth > 0 ? '+' : ''}{projections.year3Growth.toFixed(1)}%
          </div>
          <div className="mt-1 text-sm text-gray-600 font-medium">
            Est. Price: ${projections.year3Price.toLocaleString()}
          </div>
        </div>

        {/* 5 Year */}
        <div className="flex-1 bg-green-50 rounded-xl p-4 text-center transition-all hover:bg-green-100">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">5-Year Forecast</div>
          <div className="mt-2 text-3xl font-bold text-green-600">
            {projections.year5Growth > 0 ? '+' : ''}{projections.year5Growth.toFixed(1)}%
          </div>
          <div className="mt-1 text-sm text-gray-600 font-medium">
            Est. Price: ${projections.year5Price.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-400 text-center px-4">
        *Based on AI-driven models analyzing historical performance, market trends, and sector outlook.
      </div>
    </div>
  );
};
