
import React, { useState } from 'react';
import { ArrowLeft, Plus, Phone, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import OrderCard from './OrderCard';
import CreateOrderModal from './CreateOrderModal';
import EditOrderModal from './EditOrderModal';
import type { Client, Order } from '../types/types';

interface ClientDetailsProps {
  client: Client;
  onBack: () => void;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ client, onBack }) => {
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>(client.orders);

  const handleCreateOrder = (newOrder: Omit<Order, 'id'>) => {
    const order: Order = {
      ...newOrder,
      id: Date.now().toString(),
    };
    setOrders([...orders, order]);
    setShowCreateOrder(false);
  };

  const handleEditOrder = (updatedOrder: Order) => {
    setOrders(orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    ));
    setEditingOrder(null);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const handleCompleteOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'completed' as const, completedAt: new Date().toISOString() }
        : order
    ));
  };

  const handleGeneratePDF = (orderId: string) => {
    // Симуляция генерации PDF
    const pdfId = `invoice-${Date.now()}`;
    const pdfUrl = `https://example.com/invoices/${pdfId}.pdf`;
    
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: 'invoiced' as const, 
            invoicedAt: new Date().toISOString(),
            pdfUrl,
            pdfId
          }
        : order
    ));
    console.log(`PDF generated for order ${orderId}: ${pdfUrl}`);
  };

  const createdOrders = orders.filter(order => order.status === 'created');
  const invoicedOrders = orders.filter(order => order.status === 'invoiced');
  const completedOrders = orders.filter(order => order.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-800">{client.name}</h1>
            <Badge 
              variant={client.status === 'active' ? 'default' : 'secondary'}
              className={client.status === 'active' ? 'bg-green-100 text-green-800' : ''}
            >
              {client.status === 'active' ? 'Активный клиент' : 'Завершен'}
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Client Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Информация о клиенте</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{client.phone}</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <span className="text-gray-700">{client.address}</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800 mb-1">Техническое задание:</p>
                <p className="text-gray-700">{client.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Заказы</h2>
            <Button 
              onClick={() => setShowCreateOrder(true)}
              className="bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать заказ
            </Button>
          </div>

          {/* Created Orders */}
          {createdOrders.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800">Созданные заказы</h3>
              {createdOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onComplete={() => handleCompleteOrder(order.id)}
                  onEdit={() => setEditingOrder(order)}
                  onDelete={() => handleDeleteOrder(order.id)}
                  onGeneratePDF={() => handleGeneratePDF(order.id)}
                />
              ))}
            </div>
          )}

          {/* Invoiced Orders */}
          {invoicedOrders.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800">Выставленные счета</h3>
              {invoicedOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onComplete={() => handleCompleteOrder(order.id)}
                  onEdit={() => setEditingOrder(order)}
                  onDelete={() => handleDeleteOrder(order.id)}
                  onGeneratePDF={() => handleGeneratePDF(order.id)}
                />
              ))}
            </div>
          )}

          {/* Completed Orders */}
          {completedOrders.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800">Завершенные заказы</h3>
              {completedOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onComplete={() => handleCompleteOrder(order.id)}
                  onEdit={() => setEditingOrder(order)}
                  onDelete={() => handleDeleteOrder(order.id)}
                  onGeneratePDF={() => handleGeneratePDF(order.id)}
                />
              ))}
            </div>
          )}

          {orders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Заказов пока нет</p>
              <p className="text-sm">Создайте первый заказ для этого клиента</p>
            </div>
          )}
        </div>
      </div>

      <CreateOrderModal
        isOpen={showCreateOrder}
        onClose={() => setShowCreateOrder(false)}
        onSubmit={handleCreateOrder}
      />

      {editingOrder && (
        <EditOrderModal
          isOpen={!!editingOrder}
          onClose={() => setEditingOrder(null)}
          onSubmit={handleEditOrder}
          order={editingOrder}
        />
      )}
    </div>
  );
};

export default ClientDetails;
