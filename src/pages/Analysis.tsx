import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { fetchCompanyAnalysis, CompanyAnalysis } from '../api/stocks';
import { CompanySearch } from '../components/analysis/CompanySearch';
import { FinancialHealthScore } from '../components/analysis/FinancialHealthScore';
import { GrowthProjections } from '../components/analysis/GrowthProjections';
import { RecommendationCard } from '../components/analysis/RecommendationCard';

const Analysis: React.FC = () => {
  const { hasCompletedOnboarding, profile } = useUserStore();
  const [data, setData] = useState<CompanyAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (ticker: string) => {
    setIsLoading(true);
    setError('');
    try {
      const result = await fetchCompanyAnalysis(ticker, profile?.backendProfileId);
      setData(result);
    } catch (err) {
      setError('Failed to fetch analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Search Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8 tracking-tight">
          Stock Analysis
        </h1>
        <CompanySearch onSearch={handleSearch} isLoading={isLoading} />

        {/* Profile Prompt */}
        {!hasCompletedOnboarding() && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center max-w-2xl mx-auto shadow-sm">
            <p className="text-blue-800 font-medium">
              Want personalized recommendations based on your goals?
              <a href="/onboarding" className="ml-2 font-bold underline hover:text-blue-900 transition-colors">Complete your profile</a>
            </p>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center shadow-sm">
          {error}
        </div>
      )}

      {/* Results Dashboard */}
      {data && !isLoading && (
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <div className="mb-8 flex items-end gap-4 border-b pb-4 border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900">{data.companyName}</h2>
            <span className="text-xl text-gray-500 font-medium pb-1">({data.ticker})</span>
            <div className="ml-auto text-2xl font-bold text-gray-900">
              ${data.currentPrice.toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column: Health Score */}
            <div className="lg:col-span-1">
              <FinancialHealthScore score={data.financialHealthIndex} breakdown={data.healthBreakdown} />
            </div>

            {/* Middle Column: Growth Projections */}
            <div className="lg:col-span-1">
              <GrowthProjections projections={data.projections} />
            </div>

            {/* Right Column: Recommendation */}
            <div className="lg:col-span-1">
              <RecommendationCard recommendation={data.recommendation} />
            </div>
          </div>

          {/* Full Width Details */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Analysis</h3>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {data.recommendation.details}
            </p>

            {data.keySignals && data.keySignals.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Signals</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {data.keySignals.map((signal, idx) => (
                    <li key={idx}>{signal}</li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs text-gray-400 mt-6">
              Last updated: {new Date(data.lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
