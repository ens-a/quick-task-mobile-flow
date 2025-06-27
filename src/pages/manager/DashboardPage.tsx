
import React, { useState } from 'react';
import ManagerLayout from '@/components/manager/ManagerLayout';
import AnalyticsPage from './AnalyticsPage';
import ExecutorsPage from './ExecutorsPage';
import ClientsPage from './ClientsPage';
import CatalogPage from './CatalogPage';
import InvoicesPage from './InvoicesPage';

interface AdminDashboardProps {
  currentUser: string;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('analytics');

  const menuItems = [
    { id: 'analytics', title: 'Аналитика' },
    { id: 'executors', title: 'Исполнители' },
    { id: 'clients', title: 'Клиенты' },
    { id: 'catalog', title: 'Каталог' },
    { id: 'invoices', title: 'Счета' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsPage />;
      case 'executors':
        return <ExecutorsPage />;
      case 'clients':
        return <ClientsPage />;
      case 'catalog':
        return <CatalogPage />;
      case 'invoices':
        return <InvoicesPage />;
      default:
        return <AnalyticsPage />;
    }
  };

  const currentTitle = menuItems.find(item => item.id === activeTab)?.title || 'Аналитика';

  return (
    <ManagerLayout
      currentUser={currentUser}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={onLogout}
      title={currentTitle}
    >
      {renderContent()}
    </ManagerLayout>
  );
};

export default AdminDashboard;
