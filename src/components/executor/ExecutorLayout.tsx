
import React from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import ExecutorSidebar from './ExecutorSidebar';

interface ExecutorLayoutProps {
  children: React.ReactNode;
  currentUser: string;
  onLogout: () => void;
}

const ExecutorLayout: React.FC<ExecutorLayoutProps> = ({ children, currentUser, onLogout }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ExecutorSidebar currentUser={currentUser} onLogout={onLogout} />
        
        <SidebarInset className="flex-1">
          {/* Мобильный хедер с триггером */}
          <header className="sticky top-0 z-10 bg-white border-b md:hidden">
            <div className="flex items-center p-4">
              <SidebarTrigger className="mr-3" />
              <h1 className="text-lg font-semibold text-gray-800">Мои клиенты</h1>
            </div>
          </header>
          
          {/* Основной контент */}
          <main className="flex-1">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ExecutorLayout;
