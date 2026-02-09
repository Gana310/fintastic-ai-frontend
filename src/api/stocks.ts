export interface CompanyAnalysis {
  ticker: string;
  name: string;
  currentPrice: number;
  healthScore: number; // 0-100
  projections: {
    year3Growth: number; // percentage
    year5Growth: number; // percentage
    year3Price: number;
    year5Price: number;
  };
  recommendation: {
    action: 'Buy' | 'Hold' | 'Sell';
    summary: string; // Plain English summary
    details: string; // The "Story"
  };
  lastUpdated: string;
}

const USE_MOCK = true;

// Mock Data Generator
const mockFetchCompanyAnalysis = async (ticker: string): Promise<CompanyAnalysis> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const t = ticker.toUpperCase();
  const isGood = ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'TSLA'].includes(t);

  const basePrice = Math.floor(Math.random() * 500) + 50;
  const growthRate = isGood ? 0.15 : 0.05;

  return {
    ticker: t,
    name: getCompanyName(t),
    currentPrice: basePrice,
    healthScore: isGood ? 85 + Math.floor(Math.random() * 10) : 40 + Math.floor(Math.random() * 30),
    projections: {
      year3Growth: growthRate * 100 * 3,
      year5Growth: growthRate * 100 * 5,
      year3Price: Math.round(basePrice * (1 + growthRate) ** 3),
      year5Price: Math.round(basePrice * (1 + growthRate) ** 5),
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

// Real API Implementation (Stub)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const realFetchCompanyAnalysis = async (ticker: string): Promise<CompanyAnalysis> => {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/stocks/${ticker}/analysis`);
  // return response.json();
  throw new Error('Real API not implemented yet');
};

export const fetchCompanyAnalysis = (ticker: string) => {
  if (USE_MOCK) {
    return mockFetchCompanyAnalysis(ticker);
  }
  return realFetchCompanyAnalysis(ticker);
};
