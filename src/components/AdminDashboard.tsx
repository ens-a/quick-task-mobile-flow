
import React, { useState } from 'react';
import { LogOut, BarChart3, FileText, Users, UserCheck, Package, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import AnalyticsPage from './admin/AnalyticsPage';
import OrdersPage from './admin/OrdersPage';
import ExecutorsPage from './admin/ExecutorsPage';
import ClientsPage from './admin/ClientsPage';
import CatalogPage from './admin/CatalogPage';
import InvoicesPage from './admin/InvoicesPage';

interface AdminDashboardProps {
  currentUser: string;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('analytics');

  const menuItems = [
    { id: 'analytics', title: 'Аналитика', icon: BarChart3 },
    { id: 'orders', title: 'Заказы', icon: FileText },
    { id: 'executors', title: 'Исполнители', icon: UserCheck },
    { id: 'clients', title: 'Клиенты', icon: Users },
    { id: 'catalog', title: 'Каталог', icon: Package },
    { id: 'invoices', title: 'Счета', icon: Receipt },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsPage />;
      case 'orders':
        return <OrdersPage />;
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">Панель управления</h1>
                <p className="text-sm text-gray-500">{currentUser}</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <div className="p-4 mt-auto">
            <Button 
              variant="ghost" 
              onClick={onLogout}
              className="w-full justify-start text-gray-600 hover:text-gray-800"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Выйти
            </Button>
          </div>
        </Sidebar>
        
        <SidebarInset>
          <header className="bg-white shadow-sm border-b sticky top-0 z-10">
            <div className="px-4 py-3 flex items-center">
              <SidebarTrigger />
              <h2 className="ml-4 text-xl font-semibold text-gray-800">
                {menuItems.find(item => item.id === activeTab)?.title}
              </h2>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
