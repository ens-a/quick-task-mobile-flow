
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import ManagerSidebar from './ManagerSidebar';

interface ManagerLayoutProps {
  currentUser: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
  title: string;
}

const ManagerLayout: React.FC<ManagerLayoutProps> = ({
  currentUser,
  activeTab,
  onTabChange,
  onLogout,
  children,
  title,
}) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ManagerSidebar
          currentUser={currentUser}
          activeTab={activeTab}
          onTabChange={onTabChange}
          onLogout={onLogout}
        />
        
        <SidebarInset className="flex-1 min-w-0">
          <header className="bg-white shadow-sm border-b sticky top-0 z-10">
            <div className="px-4 py-3 flex items-center">
              <SidebarTrigger className="mr-4" />
              <h2 className="text-xl font-semibold text-gray-800 truncate">
                {title}
              </h2>
            </div>
          </header>
          
          <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ManagerLayout;
