
import React, { useState } from 'react';
import { Users, LogOut, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientCard from './ClientCard';
import ClientDetails from './ClientDetails';
import CreateClientModal from './CreateClientModal';
import { useAuth } from '@/hooks/useAuth';
import { useClients, DatabaseClient } from '@/hooks/useClients';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const { clients, isLoading } = useClients();
  const [selectedClient, setSelectedClient] = useState<DatabaseClient | null>(null);
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateClient, setShowCreateClient] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  const activeClients = clients.filter(client => client.status === 'active');
  const completedClients = clients.filter(client => client.status === 'completed');

  if (selectedClient) {
    return (
      <ClientDetails 
        client={selectedClient} 
        onBack={() => setSelectedClient(null)} 
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Загрузка клиентов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Мои клиенты</h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => setShowCreateClient(true)}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Добавить
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
              <ClientCard
                key={client.id}
                client={client}
                onClick={() => setSelectedClient(client)}
              />
            ))}
            {activeClients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Нет активных клиентов</p>
                <p className="text-sm">Добавьте первого клиента</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedClients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onClick={() => setSelectedClient(client)}
              />
            ))}
            {completedClients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Нет завершенных клиентов
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <CreateClientModal
        isOpen={showCreateClient}
        onClose={() => setShowCreateClient(false)}
      />
    </div>
  );
};

export default Dashboard;
