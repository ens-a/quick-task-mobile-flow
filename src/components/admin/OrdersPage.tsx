
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter } from 'lucide-react';
import { mockClients } from '../../data/mockData';
import OrderCard from '../OrderCard';
import type { Order } from '../../types/types';

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  // Get all orders from all clients
  const allOrders: (Order & { clientName: string; clientPhone: string })[] = [];
  mockClients.forEach(client => {
    client.orders.forEach(order => {
      allOrders.push({
        ...order,
        clientName: client.name,
        clientPhone: client.phone
      });
    });
  });

  const activeOrders = allOrders.filter(order => order.status !== 'completed');
  const completedOrders = allOrders.filter(order => order.status === 'completed');

  const handleOrderUpdate = (orderId: string, updatedOrder: Order) => {
    console.log('Order updated:', orderId, updatedOrder);
    // Here you would update the order in your state management
  };

  const handleOrderDelete = (orderId: string) => {
    console.log('Order deleted:', orderId);
    // Here you would delete the order from your state management
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Активные ({activeOrders.length})</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Завершенные ({completedOrders.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeOrders.map((order) => (
            <div key={order.id} className="space-y-2">
              <div className="text-sm text-gray-600 font-medium">
                {order.clientName} • {order.clientPhone}
              </div>
              <OrderCard
                order={order}
                onUpdate={(updatedOrder) => handleOrderUpdate(order.id, updatedOrder)}
                onDelete={() => handleOrderDelete(order.id)}
              />
            </div>
          ))}
          {activeOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Нет активных заказов
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedOrders.map((order) => (
            <div key={order.id} className="space-y-2">
              <div className="text-sm text-gray-600 font-medium">
                {order.clientName} • {order.clientPhone}
              </div>
              <OrderCard
                order={order}
                onUpdate={(updatedOrder) => handleOrderUpdate(order.id, updatedOrder)}
                onDelete={() => handleOrderDelete(order.id)}
              />
            </div>
          ))}
          {completedOrders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Нет завершенных заказов
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersPage;
