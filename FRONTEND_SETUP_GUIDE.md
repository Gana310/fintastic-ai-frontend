# FINtastic AI - Frontend Setup & Implementation Guide

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Gana310/fintastic-ai-frontend.git
cd fintastic-ai-frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:3000" > .env.local

# Start development server
npm run dev
```

## 📋 Required File Structure

Create this exact folder/file structure:

```
fintastic-ai-frontend/
├── src/
│   ├── api/
│   │   └── client.ts          # Axios API client
│   ├── components/
│   │   ├── onboarding/
│   │   │   ├── OnboardingFlow.tsx
│   │   │   ├── GoalSelector.tsx
│   │   │   ├── TimeHorizonSelector.tsx
│   │   │   └── RiskToleranceSelector.tsx
│   │   ├── analysis/
│   │   │   ├── CompanySearch.tsx
│   │   │   ├── CompanyAnalysis.tsx
│   │   │   ├── FinancialHealthScore.tsx
│   │   │   └── RecommendationCard.tsx
│   │   ├── discovery/
│   │   │   ├── DiscoveryView.tsx
│   │   │   └── InvestmentCard.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Layout.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Onboarding.tsx
│   │   ├── Analysis.tsx
│   │   └── Discovery.tsx
│   ├── store/
│   │   └── userStore.ts       # Zustand state
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── postcss.config.js
```

---

## 🔧 Step 1: Configuration Files

### `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
})
```

### `tsconfig.json`

```json
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
```

### `tailwind.config.js`

```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#7c3aed',
      },
    },
  },
  plugins: [],
}
```

### `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 📦 Step 2: Core Files

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FINtastic AI - AI-Powered Investing Copilot</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}
```

### `src/main.tsx`

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## 📡 Step 3: Types (Match Backend)

See backend `IMPLEMENTATION_PROGRESS.md` - copy types from `backend/src/types.ts` to `frontend/src/types/index.ts`

---

## 🎯 Step 4: Build Priority Order

### Phase 1: Foundation (Do This First)
1. Create all config files above
2. Create `src/types/index.ts` (copy from backend)
3. Create `src/api/client.ts` for API calls
4. Create `src/store/userStore.ts` for state
5. Create `src/App.tsx` with routing
6. Create `src/components/layout/Layout.tsx`

### Phase 2: Onboarding Flow
7. `src/pages/Onboarding.tsx`
8. `src/components/onboarding/*` components

### Phase 3: Analysis View
9. `src/pages/Analysis.tsx`
10. `src/components/analysis/*` components

### Phase 4: Discovery View
11. `src/pages/Discovery.tsx`
12. `src/components/discovery/*` components

---

## 📝 Key Code Snippets

### API Client (`src/api/client.ts`)

```typescript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const onboardingApi = {
  createProfile: (data: OnboardingRequest) => 
    apiClient.post('/api/onboarding', data),
  getProfile: (userId: string) => 
    apiClient.get(`/api/onboarding/${userId}`),
  updateProfile: (userId: string, data: Partial<OnboardingRequest>) => 
    apiClient.put(`/api/onboarding/${userId}`, data),
};
```

### User Store (`src/store/userStore.ts`)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userId: string | null;
  userProfile: UserProfile | null;
  setUserId: (id: string) => void;
  setUserProfile: (profile: UserProfile) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(persist(
  (set) => ({
    userId: null,
    userProfile: null,
    setUserId: (id) => set({ userId: id }),
    setUserProfile: (profile) => set({ userProfile: profile }),
    clearUser: () => set({ userId: null, userProfile: null }),
  }),
  { name: 'fintastic-user' }
));
```

### App with Routing (`src/App.tsx`)

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Analysis from './pages/Analysis';
import Discovery from './pages/Discovery';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/discovery" element={<Discovery />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
```

---

## ⚡ Next Steps

1. **Run `npm install`** in the frontend directory
2. **Create all config files** listed in Step 1
3. **Build foundation** (Phase 1 above)
4. **Test backend connection** - ensure backend is running on port 3000
5. **Build onboarding flow** (Phase 2)
6. **Build analysis view** (Phase 3)
7. **Build discovery view** (Phase 4)

---

## 👨‍💻 Development Workflow

```bash
# Terminal 1: Backend
cd fintastic-ai-backend
npm run dev

# Terminal 2: Frontend  
cd fintastic-ai-frontend
npm run dev

# Access app at http://localhost:5173
```

---

## 🚨 Important Notes

- Backend must be running on port 3000
- Frontend runs on port 5173
- User profile ID stored in localStorage via Zustand
- All types must match backend exactly
- Use Tailwind CSS for all styling

---

**Last Updated:** December 13, 2025
