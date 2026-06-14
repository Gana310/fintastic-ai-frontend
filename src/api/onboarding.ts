import { apiClient } from './client';
import { InvestorProfile } from '../types/InvestorProfile';

// Mirrors the backend's enums (src/types.ts)
export type BackendInvestmentGoal = 'long_term_growth' | 'income' | 'capital_preservation' | 'balanced';
export type BackendTimeHorizon = 'short_term' | 'medium_term' | 'long_term';
export type BackendRiskTolerance = 'conservative' | 'moderate' | 'aggressive';

export interface OnboardingRequest {
  investmentGoal: BackendInvestmentGoal;
  timeHorizon: BackendTimeHorizon;
  riskTolerance: BackendRiskTolerance;
  geography?: string;
  preferredSectors?: string[];
  esgPreference?: boolean;
}

export interface BackendUserProfile extends OnboardingRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
}

// Map the frontend's rich InvestorProfile (goals, risk tolerance, horizon) onto the
// backend's simpler OnboardingRequest shape.
export const mapToOnboardingRequest = (
  profile: Pick<InvestorProfile, 'longTermGoals' | 'shortTermGoals' | 'riskTolerance' | 'investmentHorizon'>
): OnboardingRequest => {
  const timeHorizonMap: Record<InvestorProfile['investmentHorizon'], BackendTimeHorizon> = {
    short: 'short_term',
    medium: 'medium_term',
    long: 'long_term',
  };

  const investmentGoal = deriveInvestmentGoal(profile);

  return {
    investmentGoal,
    timeHorizon: timeHorizonMap[profile.investmentHorizon],
    riskTolerance: profile.riskTolerance,
  };
};

const deriveInvestmentGoal = (
  profile: Pick<InvestorProfile, 'longTermGoals' | 'shortTermGoals' | 'riskTolerance'>
): BackendInvestmentGoal => {
  const longTermTypes = profile.longTermGoals.map((g) => g.type);
  const shortTermTypes = profile.shortTermGoals.map((g) => g.type);

  // Capital preservation: conservative investors, or those focused on debt payoff / emergency funds
  if (
    profile.riskTolerance === 'conservative' ||
    shortTermTypes.includes('emergency_fund') ||
    shortTermTypes.includes('debt_payoff')
  ) {
    return 'capital_preservation';
  }

  // Long-term growth: retirement, FIRE, wealth building, property, or aggressive risk appetite
  if (
    longTermTypes.some((t) =>
      ['retirement', 'financial_independence', 'wealth_building', 'property'].includes(t)
    ) ||
    profile.riskTolerance === 'aggressive'
  ) {
    return 'long_term_growth';
  }

  // Default for moderate, balanced profiles
  return 'balanced';
};

// POST /api/onboarding — creates a backend user profile and returns its id
export const submitOnboardingProfile = async (
  profile: Pick<InvestorProfile, 'longTermGoals' | 'shortTermGoals' | 'riskTolerance' | 'investmentHorizon'>
): Promise<BackendUserProfile> => {
  const payload = mapToOnboardingRequest(profile);
  const response = await apiClient.post<ApiResponse<BackendUserProfile>>('/api/onboarding', payload);

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message || 'Failed to submit onboarding profile');
  }

  return response.data.data;
};
