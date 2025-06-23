import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Phone, MapPin, FileText, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { mockClients } from '../../data/mockData';
import type { Client } from '../../types/types';

const ClientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  
  // Состояние для клиентов
  const [clients, setClients] = useState<Client[]>(mockClients);
  
  // Состояние для формы создания клиента
  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    address: '',
    description: ''
  });

  // Состояние для формы редактирования клиента
  const [editClient, setEditClient] = useState({
    name: '',
    phone: '',
    address: '',
    description: ''
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateClient = () => {
    // Валидация
    if (!newClient.name.trim() || !newClient.phone.trim() || !newClient.address.trim()) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Создание нового клиента
    const client: Client = {
      id: Date.now().toString(),
      name: newClient.name.trim(),
      phone: newClient.phone.trim(),
      address: newClient.address.trim(),
      description: newClient.description.trim(),
      status: 'active',
      orders: []
    };

    // Добавление клиента в список
    setClients([...clients, client]);
    
    // Очистка формы
    setNewClient({
      name: '',
      phone: '',
      address: '',
      description: ''
    });
    
    // Закрытие модального окна
    setIsCreateModalOpen(false);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setEditClient({
      name: client.name,
      phone: client.phone,
      address: client.address,
      description: client.description
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingClient) return;

    // Валидация
    if (!editClient.name.trim() || !editClient.phone.trim() || !editClient.address.trim()) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    // Обновление клиента
    const updatedClient: Client = {
      ...editingClient,
      name: editClient.name.trim(),
      phone: editClient.phone.trim(),
      address: editClient.address.trim(),
      description: editClient.description.trim()
    };

    // Обновление списка клиентов
    setClients(clients.map(client => 
      client.id === editingClient.id ? updatedClient : client
    ));

    // Закрытие модального окна
    setIsEditModalOpen(false);
    setEditingClient(null);
  };

  const handleDeleteClient = (clientId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этого клиента?')) {
      setClients(clients.filter(client => client.id !== clientId));
    }
  };

  const handleInputChange = (field: keyof typeof newClient, value: string) => {
    setNewClient(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditInputChange = (field: keyof typeof editClient, value: string) => {
    setEditClient(prev => ({
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
            placeholder="Поиск клиентов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить клиента
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-1">
                        {client.name}
                      </h3>
                      <Badge 
                        variant={client.status === 'active' ? 'default' : 'secondary'}
                        className={client.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {client.status === 'active' ? 'Активный' : 'Завершен'}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{client.address}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{client.phone}</span>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span className="line-clamp-2">{client.description}</span>
                    </div>
                  </div>

                  {client.orders.length > 0 && (
                    <div className="text-xs text-gray-500 border-t pt-3">
                      Заказов: {client.orders.length} 
                      {client.orders.filter(order => order.status !== 'completed').length > 0 && 
                        ` (${client.orders.filter(order => order.status !== 'completed').length} активных)`
                      }
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditClient(client)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? 'Клиенты не найдены' : 'Нет клиентов'}
        </div>
      )}

      {/* Модальное окно создания клиента */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить клиента</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input 
              placeholder="Имя клиента *" 
              value={newClient.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <Input 
              placeholder="Номер телефона *" 
              value={newClient.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <Input 
              placeholder="Адрес *" 
              value={newClient.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
            <Input 
              placeholder="Описание" 
              value={newClient.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <div className="flex space-x-2">
              <Button 
                className="flex-1"
                onClick={handleCreateClient}
                disabled={!newClient.name.trim() || !newClient.phone.trim() || !newClient.address.trim()}
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

      {/* Модальное окно редактирования клиента */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать клиента</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input 
              placeholder="Имя клиента *" 
              value={editClient.name}
              onChange={(e) => handleEditInputChange('name', e.target.value)}
            />
            <Input 
              placeholder="Номер телефона *" 
              value={editClient.phone}
              onChange={(e) => handleEditInputChange('phone', e.target.value)}
            />
            <Input 
              placeholder="Адрес *" 
              value={editClient.address}
              onChange={(e) => handleEditInputChange('address', e.target.value)}
            />
            <Input 
              placeholder="Описание" 
              value={editClient.description}
              onChange={(e) => handleEditInputChange('description', e.target.value)}
            />
            <div className="flex space-x-2">
              <Button 
                className="flex-1"
                onClick={handleSaveEdit}
                disabled={!editClient.name.trim() || !editClient.phone.trim() || !editClient.address.trim()}
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

export default ClientsPage;
