
import React from 'react';
import { Users, FileText, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface ExecutorSidebarProps {
  currentUser: string;
  onLogout: () => void;
}

const ExecutorSidebar: React.FC<ExecutorSidebarProps> = ({ currentUser, onLogout }) => {
  const { setOpenMobile } = useSidebar();

  const menuItems = [
    {
      title: 'Мои клиенты',
      url: '/',
      icon: Users,
    }
  ];

  const handleNavClick = () => {
    // Закрываем мобильное меню после клика на навигацию
    setOpenMobile(false);
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-gray-800 truncate">Исполнитель</h2>
            <p className="text-xs text-gray-500 truncate">{currentUser}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Навигация</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      onClick={handleNavClick}
                      className={({ isActive }) => 
                        isActive 
                          ? "bg-blue-100 text-blue-800 font-medium" 
                          : "hover:bg-gray-100"
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start text-gray-600 hover:text-gray-800"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Выйти
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ExecutorSidebar;
