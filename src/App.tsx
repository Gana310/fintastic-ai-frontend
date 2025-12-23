import { useState } from 'react';
import InvestorQuestionnaire from './components/InvestorQuestionnaire/InvestorQuestionnaire';
import { InvestorProfile } from './types/InvestorProfile';
import './App.css';

function App() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [investorProfile, setInvestorProfile] = useState<InvestorProfile | null>(null);

  const handleProfileComplete = (profile: InvestorProfile) => {
    setInvestorProfile(profile);
    setShowQuestionnaire(false);
    // Store profile in localStorage
    localStorage.setItem('investorProfile', JSON.stringify(profile));
    console.log('Investor Profile Created:', profile);
  };

  const handleCancel = () => {
    setShowQuestionnaire(false);
  };

  // Show questionnaire if no profile exists
  if (showQuestionnaire && !investorProfile) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <InvestorQuestionnaire
          onComplete={handleProfileComplete}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  // Main app content after profile is created
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              📊 FINtastic AI
            </h1>
            <button
              onClick={() => setShowQuestionnaire(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Update Investment Goals
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {investorProfile ? (
          <div className="space-y-6">
            {/* Profile Summary Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Your Investment Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Risk Tolerance</p>
                  <p className="text-lg font-semibold capitalize">
                    {investorProfile.riskTolerance}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience Level</p>
                  <p className="text-lg font-semibold capitalize">
                    {investorProfile.experienceLevel}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Investment Horizon</p>
                  <p className="text-lg font-semibold capitalize">
                    {investorProfile.investmentHorizon}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Short-term Goals</h3>
                <div className="flex flex-wrap gap-2">
                  {investorProfile.shortTermGoals.map((goal) => (
                    <span
                      key={goal.id}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {goal.type.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Long-term Goals</h3>
                <div className="flex flex-wrap gap-2">
                  {investorProfile.longTermGoals.map((goal) => (
                    <span
                      key={goal.id}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {goal.type.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Placeholder for Stock Analysis */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Stock Analysis</h2>
              <p className="text-gray-600">
                Stock analysis features will be displayed here based on your
                investment profile. Connect to the backend API to get personalized
                stock recommendations.
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Your profile indicates a{' '}
                  <strong>{investorProfile.riskTolerance}</strong> risk tolerance
                  with a <strong>{investorProfile.investmentHorizon}</strong> horizon.
                  We'll prioritize stocks that match these preferences.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to FINtastic AI!</h2>
            <p className="text-gray-600 mb-6">
              Let's start by understanding your investment goals and preferences.
            </p>
            <button
              onClick={() => setShowQuestionnaire(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Create Investment Profile
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;