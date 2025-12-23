# 📊 FINtastic AI - Frontend

Frontend for FINtastic AI - an AI-powered financial analysis platform that provides intelligent stock insights and analysis.

## 🚀 Overview

FINtastic AI is a comprehensive financial analysis platform that combines real-time stock data with AI-powered insights to help investors make informed decisions. The frontend provides an intuitive interface for users to:

- **Search and analyze stocks** with real-time data
- **Get AI-powered insights** and recommendations
- **Track portfolio performance** with interactive 
- **Complete investor profile questionnaire** with personalized goal assessmentcharts
- **View market trends** and technical indicators
- **Access historical data** and predictive analytics

## 💻 Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context / Redux (TBD)
- **Data Fetching**: Axios
- **Charts**: Chart.js / Recharts
- **API**: RESTful API (connects to fintastic-ai-backend)

## 🛠️ Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Backend API running (see [fintastic-ai-backend](https://github.com/Gana310/fintastic-ai-backend))

### Setup

```bash
# Clone the repository
git clone https://github.com/Gana310/fintastic-ai-frontend.git
cd fintastic-ai-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your backend API URL
echo "VITE_API_URL=http://localhost:3000" >> .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
fintastic-ai-frontend/
├── src/
│ ├── components/ # Reusable React components
│ │   ├── StockCard/ # Stock display cards
│ │   ├── SearchBar/ # Stock search component
│ │   ├── Chart/ # Data visualization components
│ │   └── Layout/ # App layout components
│ │
│ ├── pages/ # Page components
│ │   ├── Home.tsx # Landing page
│ │   ├── StockDetail.tsx # Individual stock analysis
│ │   ├── Portfolio.tsx # User portfolio
│ │   └── Analysis.tsx # AI insights page
│ │
│ ├── services/ # API service layer
│ │   ├── api.ts # API configuration
│ │   └── stocks.ts # Stock data services
│ │
│ ├── hooks/ # Custom React hooks
│ ├── utils/ # Utility functions
│ ├── types/ # TypeScript type definitions
│ ├── App.tsx # Main app component
│ └── main.tsx # App entry point
│
├── public/ # Static assets
├── .env.example # Environment variables template
├── package.json # Dependencies and scripts
├── tsconfig.json # TypeScript configuration
├── vite.config.ts # Vite configuration
└── README.md # This file
```

## 🛠️ Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run type checker
npm run type-check
```

## 🎯 Key Features


### 0. Investor Goals Questionnaire

- **Personalized investment profile setup** with multi-step questionnaire
- **Short-term goals** (trading, saving, emergency fund, debt payoff)
- **Long-term goals** (retirement, education, wealth building, property, financial independence)
- **Financial situation assessment** (monthly contribution capacity, current savings)
- **Risk tolerance evaluation** (conservative, moderate, aggressive)
- **Experience level tracking** (beginner, intermediate, advanced)
- **Investment horizon selection** (short-term, medium-term, long-term)
- **Profile-based recommendations** tailored to user goals and risk appetite

### 1. Stock Search & Analysis
- Real-time stock search with autocomplete
- Detailed stock information and metrics
- Interactive price charts with multiple timeframes
- Technical indicators (RSI, MACD, Moving Averages)

### 2. AI-Powered Insights
- AI-generated stock analysis and recommendations
- Sentiment analysis from news and social media
- Price prediction models
- Risk assessment scores

### 3. Portfolio Management
- Track multiple stocks in your portfolio
- View performance metrics and returns
- Set alerts for price targets
- Diversification analysis

### 4. Market Overview
- Market indices (S&P 500, NASDAQ, DOW)
- Top gainers and losers
- Sector performance
- Market news feed

## 🔗 API Integration

The frontend connects to the [fintastic-ai-backend](https://github.com/Gana310/fintastic-ai-backend) API:

### API Endpoints Used

```typescript
// Get stock quote
GET /api/stocks/:symbol

// Search stocks
GET /api/stocks/search?q={query}

// Get AI analysis
GET /api/stocks/:symbol/analysis

// Get historical data
GET /api/stocks/:symbol/history?range={1d|1w|1m|3m|1y}
```

### Environment Variables

```bash
# .env file
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=10000
```

## 🎨 UI/UX Design

- **Responsive design** - Works on desktop, tablet, and mobile
- **Dark/Light mode** - User preference for theme
- **Accessible** - WCAG 2.1 AA compliant
- **Fast** - Optimized bundle size and lazy loading

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run build

# The dist/ folder contains the production build
# Deploy to your hosting platform (Vercel, Netlify, AWS S3, etc.)
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## 📚 Documentation

- [Component Library](./docs/components.md) - Reusable component documentation
- [API Integration Guide](./docs/api.md) - How to integrate with backend
- [State Management](./docs/state.md) - State management patterns
- [Styling Guide](./docs/styling.md) - Tailwind CSS conventions

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [fintastic-ai-backend](https://github.com/Gana310/fintastic-ai-backend) - Backend API for FINtastic AI

## 💬 Support

For questions or issues:
- Open an issue on GitHub
- Contact: [your-email@example.com]

## 🚀 Roadmap

- [ ] User authentication and saved portfolios
- [ ] Real-time WebSocket updates
- [ ] Advanced charting with technical analysis tools
- [ ] Social features - share analysis and insights
- [ ] Mobile app (React Native)
- [ ] Integration with trading platforms

---

**Built with ❤️ for investors by investors**
