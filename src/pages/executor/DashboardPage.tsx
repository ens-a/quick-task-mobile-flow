
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClientCard from '@/components/common/ClientCard';
import ClientDetailsPage from './ClientDetailsPage';
import ExecutorLayout from '@/components/executor/ExecutorLayout';
import { mockClients } from '../../data/mockData';
import type { Client } from '../../types/types';

interface DashboardProps {
  currentUser: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser, onLogout }) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeTab, setActiveTab] = useState('active');

  const activeClients = mockClients.filter(client => client.status === 'active');
  const completedClients = mockClients.filter(client => client.status === 'completed');

  if (selectedClient) {
    return (
      <ExecutorLayout currentUser={currentUser} onLogout={onLogout}>
        <ClientDetailsPage 
          client={selectedClient} 
          onBack={() => setSelectedClient(null)} 
        />
      </ExecutorLayout>
    );
  }

  return (
    <ExecutorLayout currentUser={currentUser} onLogout={onLogout}>
      <div className="p-4 max-w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active" className="flex items-center space-x-2 text-sm">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Активные</span>
              <span className="sm:hidden">Активные</span>
              <span>({activeClients.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center space-x-2 text-sm">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Завершенные</span>
              <span className="sm:hidden">Завершенные</span>
              <span>({completedClients.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4 w-full">
              {activeClients.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  onClick={() => setSelectedClient(client)}
                />
              ))}
            </div>
            {activeClients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Нет активных клиентов
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4 w-full">
              {completedClients.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  onClick={() => setSelectedClient(client)}
                />
              ))}
            </div>
            {completedClients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Нет завершенных клиентов
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ExecutorLayout>
  );
};

export default Dashboard;
