import { apiClient } from './client';

// Mirrors the backend's CompanyAnalysis shape (src/types.ts, GET /api/analysis/:ticker)
export interface FinancialHealthBreakdown {
  profitability: number; // 0-100
  liquidity: number; // 0-100
  debtManagement: number; // 0-100
  revenueGrowth: number; // 0-100
  cashFlow: number; // 0-100
}

export interface ProjectionDetail {
  growthPercent: number; // projected % growth over the period
  projectedPrice: number; // projected share price at end of period
  outlook: string; // plain-language commentary
}

export interface CompanyAnalysis {
  ticker: string;
  companyName: string;
  currentPrice: number;

  financialHealthIndex: number;
  healthBreakdown: FinancialHealthBreakdown;

  projections: {
    threeYear: ProjectionDetail;
    fiveYear: ProjectionDetail;
    epsForecast: number;
  };

  recommendation: {
    action: 'Buy' | 'Hold' | 'Watch' | 'Sell';
    summary: string; // Plain English summary
    details: string; // The "Story"
  };

  keySignals: string[];
  lastUpdated: string;
}

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const buildHealthBreakdown = (isGood: boolean): FinancialHealthBreakdown => ({
  profitability: isGood ? 85 : 50,
  liquidity: isGood ? 80 : 50,
  debtManagement: isGood ? 78 : 45,
  revenueGrowth: isGood ? 88 : 40,
  cashFlow: isGood ? 82 : 48,
});

// Mock Data Generator
const mockFetchCompanyAnalysis = async (ticker: string): Promise<CompanyAnalysis> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const t = ticker.toUpperCase();
  const isGood = ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'TSLA'].includes(t);

  const basePrice = Math.floor(Math.random() * 500) + 50;
  const growthRate = isGood ? 0.15 : 0.05;
  const healthBreakdown = buildHealthBreakdown(isGood);
  const financialHealthIndex = Math.round(
    (healthBreakdown.profitability +
      healthBreakdown.liquidity +
      healthBreakdown.debtManagement +
      healthBreakdown.revenueGrowth +
      healthBreakdown.cashFlow) /
      5
  );

  return {
    ticker: t,
    companyName: getCompanyName(t),
    currentPrice: basePrice,
    financialHealthIndex,
    healthBreakdown,
    projections: {
      threeYear: {
        growthPercent: growthRate * 100 * 3,
        projectedPrice: Math.round(basePrice * (1 + growthRate) ** 3),
        outlook: `Projected growth based on current fundamentals and sector trends.`,
      },
      fiveYear: {
        growthPercent: growthRate * 100 * 5,
        projectedPrice: Math.round(basePrice * (1 + growthRate) ** 5),
        outlook: `Cumulative growth assuming continued execution and stable market conditions.`,
      },
      epsForecast: Math.round((basePrice / 20) * 10) / 10,
    },
    recommendation: {
      action: isGood ? 'Buy' : 'Hold',
      summary: isGood
        ? `${t} shows strong fundamentals and consistent growth potential.`
        : `${t} faces some headwinds but maintains a stable market position.`,
      details: isGood
        ? `${t} has a robust balance sheet and is well-positioned to capitalize on emerging market trends. Our AI analysis indicates a high probability of outperforming the market over the next 3-5 years, driven by innovation and strong cash flow.`
        : `${t} is currently in a transition phase. While the core business is stable, growth has slowed. We recommend holding current positions while monitoring upcoming earnings reports for signs of a turnaround.`,
    },
    keySignals: isGood
      ? ['Revenue growth trending positive', 'Strong free cash flow generation']
      : ['Metrics broadly in line with sector averages'],
    lastUpdated: new Date().toISOString(),
  };
};

// Helper for mock names
const getCompanyName = (ticker: string) => {
  const map: Record<string, string> = {
    AAPL: 'Apple Inc.',
    MSFT: 'Microsoft Corporation',
    GOOGL: 'Alphabet Inc.',
    NVDA: 'NVIDIA Corporation',
    TSLA: 'Tesla, Inc.',
    AMZN: 'Amazon.com, Inc.',
  };
  return map[ticker] || `${ticker} Corporation`;
};

// Real API Implementation
const realFetchCompanyAnalysis = async (ticker: string, profileId?: string): Promise<CompanyAnalysis> => {
  const response = await apiClient.get<CompanyAnalysis>(`/api/analysis/${encodeURIComponent(ticker)}`, {
    params: profileId ? { profileId } : undefined,
  });
  return response.data;
};

// profileId (InvestorProfile.backendProfileId) is optional and, when present,
// lets the backend link this analysis_view event to the viewer's onboarding
// profile for behavioural instrumentation (PRFAQ Day-1 requirement).
export const fetchCompanyAnalysis = (ticker: string, profileId?: string) => {
  if (USE_MOCK) {
    return mockFetchCompanyAnalysis(ticker);
  }
  return realFetchCompanyAnalysis(ticker, profileId);
};
