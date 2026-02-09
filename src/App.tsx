import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Analysis from './pages/Analysis';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="*" element={<Home />} /> {/* Fallback to Home */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
