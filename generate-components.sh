#!/bin/bash

# Component Generator Script for FINtastic AI
# This script creates all necessary React component files

echo "🚀 Starting FINtastic AI Component Generation..."

# Create Onboarding Components
echo "📝 Creating Onboarding components..."

cat > src/components/Onboarding.tsx << 'EOF'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import type { OnboardingData } from '../types';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const setOnboardingData = useStore((state) => state.setOnboardingData);
  
  const [formData, setFormData] = useState<OnboardingData>({
    investmentGoal: '',
    timeHorizon: '',
    riskTolerance: '',
    currentInvestments: '',
    monthlyBudget: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      setOnboardingData(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to FINtastic AI</h1>
        <p className="text-gray-600 mb-8">Let's understand your financial goals</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's your primary investment goal?
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.investmentGoal}
              onChange={(e) => setFormData({...formData, investmentGoal: e.target.value})}
              required
            >
              <option value="">Select a goal</option>
              <option value="retirement">Retirement Planning</option>
              <option value="wealth">Wealth Building</option>
              <option value="income">Generate Income</option>
              <option value="education">Education Fund</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Time Horizon
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.timeHorizon}
              onChange={(e) => setFormData({...formData, timeHorizon: e.target.value})}
              required
            >
              <option value="">Select timeframe</option>
              <option value="short">1-3 years</option>
              <option value="medium">3-7 years</option>
              <option value="long">7+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Risk Tolerance
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.riskTolerance}
              onChange={(e) => setFormData({...formData, riskTolerance: e.target.value})}
              required
            >
              <option value="">Select risk level</option>
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Investment Budget ($)
            </label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.monthlyBudget}
              onChange={(e) => setFormData({...formData, monthlyBudget: Number(e.target.value)})}
              placeholder="1000"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Continue to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
EOF

# Create Dashboard Component
echo "📊 Creating Dashboard component..."

cat > src/components/Dashboard.tsx << 'EOF'
import React from 'react';
import { useStore } from '../store/useStore';
import SearchBar from './SearchBar';
import AnalysisCard from './AnalysisCard';
import DiscoveryList from './DiscoveryList';

const Dashboard: React.FC = () => {
  const { onboardingData, analyses } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-600">FINtastic AI</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-blue-100">
            Goal: {onboardingData?.investmentGoal || 'Not set'} | 
            Time Horizon: {onboardingData?.timeHorizon || 'Not set'}
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Analysis Results */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Analyses</h3>
          <div className="grid gap-6">
            {analyses.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-gray-500">
                Search for a company to get started with AI-powered analysis
              </div>
            ) : (
              analyses.map((analysis) => (
                <AnalysisCard key={analysis.ticker} analysis={analysis} />
              ))
            )}
          </div>
        </div>

        {/* Discovery Section */}
        <div>
          <DiscoveryList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
EOF

# Create SearchBar Component
echo "🔍 Creating SearchBar component..."

cat > src/components/SearchBar.tsx << 'EOF'
import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import type { CompanyAnalysis } from '../types';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const addAnalysis = useStore((state) => state.addAnalysis);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/analysis/${encodeURIComponent(query)}`
      );
      const data: CompanyAnalysis = await response.json();
      addAnalysis(data);
      setQuery('');
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to fetch analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter company name or ticker (e.g., AAPL, Tesla)..."
        className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
};

export default SearchBar;
EOF

echo "✅ All components generated successfully!"
echo ""
echo "Next steps:"
echo "1. Run 'npm install' to install dependencies"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:5173"
