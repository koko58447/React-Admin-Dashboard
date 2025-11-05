import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ManagePurchase from './components/ManagePurchase';
import POS from './components/POS';
import CashSale from './components/CashSale';
import Finance from './components/Finance';


interface DashboardLayoutProps {
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'POS':
        return <POS />;
      case 'Manage Purchase':
        return <ManagePurchase />;
      case 'Cash Sale':
        return <CashSale />;
      case 'Finance':
        return <Finance />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="d-flex vh-100 bg-light">
      <Sidebar isCollapsed={isSidebarCollapsed} setActivePage={setActivePage} activePage={activePage} />
      <div className="flex-grow-1 d-flex flex-column" style={{overflow: 'hidden'}}>
        <Header toggleSidebar={toggleSidebar} onLogout={onLogout} />
        <main className="flex-grow-1 overflow-auto p-3 p-md-4">
          {renderContent()}
          <footer className="text-center mt-auto pt-4">
            <p className="text-muted small">Create by NC</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;