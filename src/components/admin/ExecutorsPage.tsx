
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Phone, User, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Executor {
  id: string;
  name: string;
  phone: string;
  email: string;
  activeOrders: number;
  completedOrders: number;
  totalRevenue: number;
}

const ExecutorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock data
  const executors: Executor[] = [
    {
      id: '1',
      name: 'Иван Петров',
      phone: '+7 (999) 123-45-67',
      email: 'ivan@example.com',
      activeOrders: 3,
      completedOrders: 15,
      totalRevenue: 85000
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      phone: '+7 (999) 123-45-68',
      email: 'maria@example.com',
      activeOrders: 2,
      completedOrders: 12,
      totalRevenue: 68000
    },
    {
      id: '3',
      name: 'Алексей Козлов',
      phone: '+7 (999) 123-45-69',
      email: 'alexey@example.com',
      activeOrders: 4,
      completedOrders: 18,
      totalRevenue: 95000
    }
  ];

  const filteredExecutors = executors.filter(executor =>
    executor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    executor.phone.includes(searchTerm) ||
    executor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск исполнителей..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить исполнителя
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredExecutors.map((executor) => (
          <Card key={executor.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{executor.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{executor.phone}</span>
                        </span>
                        <span>{executor.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{executor.activeOrders}</div>
                      <div className="text-sm text-gray-500">Активных заказов</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{executor.completedOrders}</div>
                      <div className="text-sm text-gray-500">Завершено</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{executor.totalRevenue.toLocaleString()} ₽</div>
                      <div className="text-sm text-gray-500">Общая выручка</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExecutors.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? 'Исполнители не найдены' : 'Нет исполнителей'}
        </div>
      )}

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить исполнителя</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Имя исполнителя" />
            <Input placeholder="Номер телефона" />
            <Input placeholder="Email" />
            <div className="flex space-x-2">
              <Button className="flex-1">Создать</Button>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExecutorsPage;
