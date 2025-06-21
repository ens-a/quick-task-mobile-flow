import { useState } from 'react';
import { Order } from '../types/types';

interface UseOrderActionsProps {
  orders: Order[];
  onOrdersChange: (orders: Order[]) => void;
}

export const useOrderActions = ({ orders, onOrdersChange }: UseOrderActionsProps) => {
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  const handleCompleteOrder = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'completed' as const, completedAt: new Date().toISOString() }
        : order
    );
    onOrdersChange(updatedOrders);
    console.log('Order completed:', orderId);
  };

  const handleEditOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setEditingOrder(order);
    }
    console.log('Order edit:', orderId);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      onOrdersChange(updatedOrders);
      console.log('Order deleted:', orderId);
    }
  };

  const handleGeneratePDF = (orderId: string) => {
    // Симуляция генерации PDF
    const pdfId = `invoice-${Date.now()}`;
    const pdfUrl = `https://example.com/invoices/${pdfId}.pdf`;
    
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: 'invoiced' as const, 
            invoicedAt: new Date().toISOString(),
            pdfUrl,
            pdfId
          }
        : order
    );
    onOrdersChange(updatedOrders);
    console.log(`PDF generated for order ${orderId}: ${pdfUrl}`);
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    const updatedOrders = orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    );
    onOrdersChange(updatedOrders);
    setEditingOrder(null);
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
  };

  return {
    editingOrder,
    handleCompleteOrder,
    handleEditOrder,
    handleDeleteOrder,
    handleGeneratePDF,
    handleUpdateOrder,
    handleCancelEdit,
  };
}; 