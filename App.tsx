import React, { useState } from 'react';
import Login from './components/Login';
import DashboardLayout from './DashboardLayout';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
  }

  return (
    <>
      {isAuthenticated ? <DashboardLayout onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </>
  );
};

export default App;