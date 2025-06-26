import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Phone, User, Edit, Trash2, ClipboardList } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Executor {
  id: string;
  name: string;
  phone: string;
  email: string;
  activeOrders: number;
}

const ExecutorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingExecutor, setEditingExecutor] = useState<Executor | null>(null);

  // Состояние для исполнителей
  const [executors, setExecutors] = useState<Executor[]>([
    {
      id: '1',
      name: 'Иван Петров',
      phone: '+7 (999) 123-45-67',
      email: 'ivan@example.com',
      activeOrders: 3
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      phone: '+7 (999) 123-45-68',
      email: 'maria@example.com',
      activeOrders: 2
    },
    {
      id: '3',
      name: 'Алексей Козлов',
      phone: '+7 (999) 123-45-69',
      email: 'alexey@example.com',
      activeOrders: 4
    }
  ]);

  // Состояние для формы создания исполнителя
  const [newExecutor, setNewExecutor] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Состояние для формы редактирования исполнителя
  const [editExecutor, setEditExecutor] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const filteredExecutors = executors.filter(executor =>
    executor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    executor.phone.includes(searchTerm) ||
    executor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateExecutor = () => {
    // Валидация
    if (!newExecutor.name.trim() || !newExecutor.phone.trim() || !newExecutor.email.trim()) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Создание нового исполнителя
    const executor: Executor = {
      id: Date.now().toString(),
      name: newExecutor.name.trim(),
      phone: newExecutor.phone.trim(),
      email: newExecutor.email.trim(),
      activeOrders: 0
    };

    // Добавление исполнителя в список
    setExecutors([...executors, executor]);
    
    // Очистка формы
    setNewExecutor({
      name: '',
      phone: '',
      email: ''
    });
    
    // Закрытие модального окна
    setIsCreateModalOpen(false);
  };

  const handleEditExecutor = (executor: Executor) => {
    setEditingExecutor(executor);
    setEditExecutor({
      name: executor.name,
      phone: executor.phone,
      email: executor.email
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingExecutor) return;

    // Валидация
    if (!editExecutor.name.trim() || !editExecutor.phone.trim() || !editExecutor.email.trim()) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Обновление исполнителя
    const updatedExecutor: Executor = {
      ...editingExecutor,
      name: editExecutor.name.trim(),
      phone: editExecutor.phone.trim(),
      email: editExecutor.email.trim()
    };

    // Обновление списка исполнителей
    setExecutors(executors.map(executor => 
      executor.id === editingExecutor.id ? updatedExecutor : executor
    ));

    // Закрытие модального окна
    setIsEditModalOpen(false);
    setEditingExecutor(null);
  };

  const handleDeleteExecutor = (executorId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этого исполнителя?')) {
      setExecutors(executors.filter(executor => executor.id !== executorId));
    }
  };

  const handleInputChange = (field: keyof typeof newExecutor, value: string) => {
    setNewExecutor(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditInputChange = (field: keyof typeof editExecutor, value: string) => {
    setEditExecutor(prev => ({
      ...prev,
      [field]: value
    }));
  };

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
                    <div className="flex-1">
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
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <ClipboardList className="w-4 h-4" />
                      <span>Клиентов в работе: <span className="font-semibold text-blue-600">{executor.activeOrders}</span></span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditExecutor(executor)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteExecutor(executor.id)}
                  >
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

      {/* Модальное окно создания исполнителя */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить исполнителя</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input 
              placeholder="Имя исполнителя *" 
              value={newExecutor.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <Input 
              placeholder="Номер телефона *" 
              value={newExecutor.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <Input 
              placeholder="Email *" 
              value={newExecutor.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <div className="flex space-x-2">
              <Button 
                className="flex-1"
                onClick={handleCreateExecutor}
                disabled={!newExecutor.name.trim() || !newExecutor.phone.trim() || !newExecutor.email.trim()}
              >
                Создать
              </Button>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно редактирования исполнителя */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать исполнителя</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input 
              placeholder="Имя исполнителя *" 
              value={editExecutor.name}
              onChange={(e) => handleEditInputChange('name', e.target.value)}
            />
            <Input 
              placeholder="Номер телефона *" 
              value={editExecutor.phone}
              onChange={(e) => handleEditInputChange('phone', e.target.value)}
            />
            <Input 
              placeholder="Email *" 
              value={editExecutor.email}
              onChange={(e) => handleEditInputChange('email', e.target.value)}
            />
            <div className="flex space-x-2">
              <Button 
                className="flex-1"
                onClick={handleSaveEdit}
                disabled={!editExecutor.name.trim() || !editExecutor.phone.trim() || !editExecutor.email.trim()}
              >
                Сохранить
              </Button>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
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
