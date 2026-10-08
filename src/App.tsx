import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import AdminPage from '@/pages/AdminPage';
import FloatingParticles from '@/components/layout/FloatingParticles';
import BackToTop from '@/components/layout/BackToTop';
import LoadingScreen from '@/components/layout/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen overflow-x-hidden">
          <FloatingParticles />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <BackToTop />
          <Toaster />
        </div>
      )}
    </Router>
  );
}

export default App;
