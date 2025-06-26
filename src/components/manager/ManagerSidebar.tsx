
import React from 'react';
import { Users, FileText, BarChart3, Package, UserCheck, LogOut } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ManagerSidebarProps {
  onLogout: () => void;
}

const ManagerSidebar: React.FC<ManagerSidebarProps> = ({ onLogout }) => {
  const menuItems = [
    { icon: BarChart3, label: 'Дашборд', active: true },
    { icon: Users, label: 'Клиенты' },
    { icon: FileText, label: 'Счета' },
    { icon: Package, label: 'Каталог' },
    { icon: UserCheck, label: 'Исполнители' },
    { icon: BarChart3, label: 'Аналитика' },
  ];

  return (
    <div className="w-64 h-screen bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Меню руководителя</h2>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start ${
                item.active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default ManagerSidebar;
