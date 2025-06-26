import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Phone, MapPin, FileText, Edit, Trash2, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientCard from '@/components/common/ClientCard';
import ClientDetailsPage from '@/pages/executor/ClientDetailsPage';
import { mockClients } from '../../data/mockData';
import type { Client } from '../../types/types';

const ClientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    address: '',
    description: ''
  });
  const [editClient, setEditClient] = useState({
    name: '',
    phone: '',
    address: '',
    description: ''
  });
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Фильтрация клиентов по поиску
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Разделение клиентов по статусу
  const activeClients = filteredClients.filter(client => client.status === 'active');
  const completedClients = filteredClients.filter(client => client.status === 'completed');

  // --- CRUD Клиентов (оставляю как было) ---
  const handleCreateClient = () => {
    if (!newClient.name.trim() || !newClient.phone.trim() || !newClient.address.trim()) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    const client: Client = {
      id: Date.now().toString(),
      name: newClient.name.trim(),
      phone: newClient.phone.trim(),
      address: newClient.address.trim(),
      description: newClient.description.trim(),
      status: 'active',
      invoices: []
    };
    setClients([...clients, client]);
    setNewClient({ name: '', phone: '', address: '', description: '' });
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
    setClients(clients.map(client => client.id === editingClient.id ? updatedClient : client));
    setIsEditModalOpen(false);
    setEditingClient(null);
  };
  const handleDeleteClient = (clientId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этого клиента?')) {
      setClients(clients.filter(client => client.id !== clientId));
    }
  };
  const handleInputChange = (field: keyof typeof newClient, value: string) => {
    setNewClient(prev => ({ ...prev, [field]: value }));
  };
  const handleEditInputChange = (field: keyof typeof editClient, value: string) => {
    setEditClient(prev => ({ ...prev, [field]: value }));
  };

  // --- Детали клиента ---
  if (selectedClient) {
    return (
      <ClientDetailsPage 
        client={selectedClient}
        onBack={() => setSelectedClient(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
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
        <Tabs value={activeTab} onValueChange={v => setActiveTab(v as 'active' | 'completed')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Активные ({activeClients.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Завершенные ({completedClients.length})</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            {activeClients.map((client) => (
              <div key={client.id} className="relative group">
                <ClientCard
                  client={client}
                  onClick={() => setSelectedClient(client)}
                />
                <div className="absolute top-4 right-4 flex space-x-2 opacity-100 group-hover:opacity-100 z-10">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={e => { e.stopPropagation(); handleEditClient(client); }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={e => { e.stopPropagation(); handleDeleteClient(client.id); }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {activeClients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Нет активных клиентов
              </div>
            )}
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            {completedClients.map((client) => (
              <div key={client.id} className="relative group">
                <ClientCard
                  client={client}
                  onClick={() => setSelectedClient(client)}
                />
                <div className="absolute top-4 right-4 flex space-x-2 opacity-100 group-hover:opacity-100 z-10">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={e => { e.stopPropagation(); handleEditClient(client); }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={e => { e.stopPropagation(); handleDeleteClient(client.id); }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {completedClients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Нет завершенных клиентов
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
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
