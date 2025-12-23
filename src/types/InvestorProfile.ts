// Investor Profile Type Definitions

export type RiskTolerance = 'conservative' | 'moderate' | 'aggressive';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type InvestmentHorizon = 'short' | 'medium' | 'long';

export interface ShortTermGoal {
  id: string;
  type: 'trading' | 'saving' | 'emergency_fund' | 'debt_payoff' | 'other';
  description: string;
  targetAmount?: number;
  targetDate?: Date;
  priority: 'high' | 'medium' | 'low';
}

export interface LongTermGoal {
  id: string;
  type: 'retirement' | 'education' | 'wealth_building' | 'property' | 'financial_independence' | 'other';
  description: string;
  targetAmount?: number;
  targetDate?: Date;
  priority: 'high' | 'medium' | 'low';
}

export interface InvestmentConstraints {
  monthlyContribution?: number;
  currentSavings?: number;
  maxDrawdownTolerance?: number; // percentage
  liquidityNeeds?: string;
}

export interface RiskAssessment {
  marketDropResponse: string;
  volatilityComfort: RiskTolerance;
  capitalPreservation: boolean;
  growthPriority: boolean;
}

export interface InvestorProfile {
  // Goals
  shortTermGoals: ShortTermGoal[];
  longTermGoals: LongTermGoal[];
  
  // Investment Constraints
  constraints: InvestmentConstraints;
  
  // Risk & Experience
  riskTolerance: RiskTolerance;
  experienceLevel: ExperienceLevel;
  investmentHorizon: InvestmentHorizon;
  riskAssessment: RiskAssessment;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionnaireFormData {
  // Step 1: Short-term goals
  shortTermGoals: ShortTermGoal[];
  
  // Step 2: Long-term goals
  longTermGoals: LongTermGoal[];
  
  // Step 3: Financial situation
  monthlyContribution?: number;
  currentSavings?: number;
  
  // Step 4: Risk assessment
  marketDropResponse?: string;
  volatilityComfort?: RiskTolerance;
  experienceLevel?: ExperienceLevel;
  investmentHorizon?: InvestmentHorizon;
}