#!/bin/bash

# Infrastructure Generator Script for FINtastic AI
# Creates types, store, routing, and configuration files

echo "🚀 Starting FINtastic AI Infrastructure Generation..."

# Create TypeScript types
echo "📝 Creating type definitions..."

cat > src/types/index.ts << 'EOF'
export interface OnboardingData {
  investmentGoal: string;
  timeHorizon: string;
  riskTolerance: string;
  currentInvestments: string;
  monthlyBudget: number;
}

export interface CompanyAnalysis {
  ticker: string;
  companyName: string;
  financialHealthIndex: number;
  threeYearOutlook: string;
  fiveYearOutlook: string;
  personalizedRecommendation: string;
  timestamp: string;
}

export interface CompanyDiscovery {
  ticker: string;
  name: string;
  reason: string;
  score: number;
}

export interface AppState {
  onboardingData: OnboardingData | null;
  analyses: CompanyAnalysis[];
  setOnboardingData: (data: OnboardingData) => void;
  addAnalysis: (analysis: CompanyAnalysis) => void;
}
EOF

# Create Zustand store
echo "📦 Creating state management store..."

cat > src/store/useStore.ts << 'EOF'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, OnboardingData, CompanyAnalysis } from '../types';

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      onboardingData: null,
      analyses: [],
      
      setOnboardingData: (data: OnboardingData) => 
        set({ onboardingData: data }),
      
      addAnalysis: (analysis: CompanyAnalysis) => 
        set((state) => ({ 
          analyses: [analysis, ...state.analyses]
        })),
    }),
    {
      name: 'fintastic-storage',
    }
  )
);
EOF

# Create main App component with routing
echo "🎉 Creating main App component..."

cat > src/App.tsx << 'EOF'
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';

function App() {
  const onboardingData = useStore((state) => state.onboardingData);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            onboardingData ? 
              <Navigate to="/dashboard" replace /> : 
              <Onboarding />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            onboardingData ? 
              <Dashboard /> : 
              <Navigate to="/" replace />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
EOF

# Create main.tsx entry point
echo "⚙️ Creating entry point..."

cat > src/main.tsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
EOF

# Create index.css
echo "🎨 Creating styles..."

cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

#root {
  width: 100%;
}
EOF

# Create index.html
echo "📝 Creating HTML template..."

cat > index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FINtastic AI - Smart Financial Analysis</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# Create Vite config
echo "⚙️ Creating Vite configuration..."

cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
EOF

# Create TypeScript config
echo "🛠️ Creating TypeScript configuration..."

cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

cat > tsconfig.node.json << 'EOF'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF

# Create Tailwind config
echo "🎨 Creating Tailwind configuration..."

cat > tailwind.config.js << 'EOF'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

echo "✅ All infrastructure files generated successfully!"
echo ""
echo "📦 Files created:"
echo "  ✓ src/types/index.ts - TypeScript type definitions"
echo "  ✓ src/store/useStore.ts - Zustand state management"
echo "  ✓ src/App.tsx - Main app component with routing"
echo "  ✓ src/main.tsx - React entry point"
echo "  ✓ src/index.css - Tailwind CSS setup"
echo "  ✓ index.html - HTML template"
echo "  ✓ vite.config.ts - Vite configuration"
echo "  ✓ tsconfig.json - TypeScript configuration"
echo "  ✓ tailwind.config.js - Tailwind configuration"
echo "  ✓ postcss.config.js - PostCSS configuration"
echo ""
echo "🚀 Your FINtastic AI frontend is ready!"
echo "Run: npm install && npm run dev"
