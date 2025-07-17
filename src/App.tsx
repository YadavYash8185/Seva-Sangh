import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import NGOAuth from './pages/NGOAuth';
import DonorAuth from './pages/DonorAuth';
import NGODashboard from './pages/NGODashboard';
import DonorDashboard from './pages/DonorDashboard';
import DonationDetails from './pages/DonationDetails';
import { AuthProvider } from './contexts/AuthContext';
import { DonationProvider } from './contexts/DonationContext';

function App() {
  return (
    <AuthProvider>
      <DonationProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/ngo/auth" element={<NGOAuth />} />
              <Route path="/donor/auth" element={<DonorAuth />} />
              <Route path="/ngo/dashboard" element={<NGODashboard />} />
              <Route path="/donor/dashboard" element={<DonorDashboard />} />
              <Route path="/donation/:id" element={<DonationDetails />} />
            </Routes>
          </div>
        </Router>
      </DonationProvider>
    </AuthProvider>
  );
}

export default App;