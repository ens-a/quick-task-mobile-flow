import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter } from 'lucide-react';
import { mockClients } from '../../data/mockData';
import OrderCard from '../OrderCard';
import type { Order } from '../../types/types';
import OrdersList from '../OrdersList';
import { useOrderActions } from '../../hooks/useOrderActions';
import EditOrderModal from '../EditOrderModal';

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  // Get all orders from all clients and manage them in state
  const [allOrders, setAllOrders] = useState<Order[]>(() => {
    const orders: Order[] = [];
    mockClients.forEach(client => {
      client.orders.forEach(order => {
        orders.push(order);
      });
    });
    return orders;
  });

  const {
    editingOrder,
    handleCompleteOrder,
    handleEditOrder,
    handleDeleteOrder,
    handleGeneratePDF,
    handleUpdateOrder,
    handleCancelEdit,
  } = useOrderActions({
    orders: allOrders,
    onOrdersChange: setAllOrders,
  });

  const activeOrders = allOrders.filter(order => order.status !== 'completed');
  const completedOrders = allOrders.filter(order => order.status === 'completed');

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
          <OrdersList
            orders={activeOrders}
            onComplete={handleCompleteOrder}
            onEdit={handleEditOrder}
            onDelete={handleDeleteOrder}
            onGeneratePDF={handleGeneratePDF}
            emptyText="Нет активных заказов"
          />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <OrdersList
            orders={completedOrders}
            onComplete={handleCompleteOrder}
            onEdit={handleEditOrder}
            onDelete={handleDeleteOrder}
            onGeneratePDF={handleGeneratePDF}
            emptyText="Нет завершенных заказов"
          />
        </TabsContent>
      </Tabs>

      {editingOrder && (
        <EditOrderModal
          isOpen={!!editingOrder}
          onClose={handleCancelEdit}
          onSubmit={handleUpdateOrder}
          order={editingOrder}
        />
      )}
    </div>
  );
};

export default OrdersPage;
