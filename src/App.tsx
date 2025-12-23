import { useState } from 'react';
import InvestorQuestionnaire from './components/InvestorQuestionnaire/InvestorQuestionnaire';
import { InvestorProfile } from './types/InvestorProfile';
import './App.css';

function App() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
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
  if (showQuestionnaire || !investorProfile) {
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-4 py-8">
        <main className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome to Fintastic AI</h2>
            <p className="text-gray-600 mb-6">
              Let's start by understanding your investment profile.
            </p>
            <button
              onClick={() => setShowQuestionnaire(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Investment Profile
            </button>
          </div>

          {investorProfile && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold mb-4">Your Investment Profile</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Goals: </span>
                  {investorProfile.investmentGoals.join(', ')}
                </div>
                <div>
                  <span className="font-medium">Short-term: </span>
                  {investorProfile.shortTermGoals}
                </div>
                <div>
                  <span className="font-medium">Long-term: </span>
                  {investorProfile.longTermGoals}
                </div>
                <div>
                  <span className="font-medium">Risk Tolerance: </span>
                  {investorProfile.riskTolerance}
                </div>
                <button
                  onClick={() => setShowQuestionnaire(true)}
                  className="mt-4 text-blue-600 hover:text-blue-700 underline"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold mb-4">Stock Analysis</h3>
            <p className="text-gray-600">
              Stock analysis and recommendations will appear here based on your profile.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;