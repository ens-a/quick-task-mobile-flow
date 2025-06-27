
import React from 'react';
import { LogOut, BarChart3, Users, UserCheck, Package, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

interface ManagerSidebarProps {
  currentUser: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const ManagerSidebar: React.FC<ManagerSidebarProps> = ({
  currentUser,
  activeTab,
  onTabChange,
  onLogout,
}) => {
  const { setOpenMobile } = useSidebar();

  const menuItems = [
    { id: 'analytics', title: 'Аналитика', icon: BarChart3 },
    { id: 'executors', title: 'Исполнители', icon: UserCheck },
    { id: 'clients', title: 'Клиенты', icon: Users },
    { id: 'catalog', title: 'Каталог', icon: Package },
    { id: 'invoices', title: 'Счета', icon: Receipt },
  ];

  const handleMenuClick = (tabId: string) => {
    onTabChange(tabId);
    // Автоматически скрываем меню на мобильных устройствах
    setOpenMobile(false);
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold text-gray-800 truncate">Панель управления</h1>
            <p className="text-sm text-gray-500 truncate">{currentUser}</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="flex-1">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => handleMenuClick(item.id)}
                isActive={activeTab === item.id}
                className="w-full justify-start"
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <div className="p-4 mt-auto border-t">
        <Button 
          variant="ghost" 
          onClick={onLogout}
          className="w-full justify-start text-gray-600 hover:text-gray-800"
        >
          <LogOut className="w-5 h-5 mr-2 flex-shrink-0" />
          <span className="truncate">Выйти</span>
        </Button>
      </div>
    </Sidebar>
  );
};

export default ManagerSidebar;
