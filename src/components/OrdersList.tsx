import React from 'react';
import { Order } from '../types/types';
import OrderCard from './OrderCard';

interface OrdersListProps {
  orders: Order[];
  onEdit?: (orderId: string) => void;
  onDelete?: (orderId: string) => void;
  onComplete?: (orderId: string) => void;
  onGeneratePDF?: (orderId: string) => void;
  emptyText?: string;
}

const OrdersList: React.FC<OrdersListProps> = ({
  orders,
  onEdit,
  onDelete,
  onComplete,
  onGeneratePDF,
  emptyText = 'Нет заказов',
}) => {
  if (!orders.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onEdit={onEdit ? () => onEdit(order.id) : undefined}
          onDelete={onDelete ? () => onDelete(order.id) : undefined}
          onComplete={onComplete ? () => onComplete(order.id) : undefined}
          onGeneratePDF={onGeneratePDF ? () => onGeneratePDF(order.id) : undefined}
        />
      ))}
    </div>
  );
};

export default OrdersList; 