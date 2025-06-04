
import React from 'react';
import { Calendar, Package, Wrench, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Order } from '../types/types';

interface OrderCardProps {
  order: Order;
  onClose: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClose }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalCost = order.services.reduce((sum, service) => sum + service.price, 0) +
                   order.materials.reduce((sum, material) => sum + material.price * material.quantity, 0);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge 
                variant={order.status === 'active' ? 'default' : 'secondary'}
                className={order.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
              >
                {order.status === 'active' ? 'В работе' : 'Завершен'}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Создан: {formatDate(order.createdAt)}</span>
            </div>
            
            {order.completedAt && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Check className="w-4 h-4" />
                <span>Завершен: {formatDate(order.completedAt)}</span>
              </div>
            )}
          </div>
          
          {order.status === 'active' && (
            <Button
              onClick={onClose}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="w-4 h-4 mr-1" />
              Закрыть
            </Button>
          )}
        </div>

        {/* Services */}
        {order.services.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Wrench className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-800">Услуги:</span>
            </div>
            <div className="space-y-1 ml-6">
              {order.services.map((service, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">{service.name}</span>
                  <span className="font-medium">{service.price} ₽</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Materials */}
        {order.materials.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Package className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-800">Расходники:</span>
            </div>
            <div className="space-y-1 ml-6">
              {order.materials.map((material, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {material.name} × {material.quantity}
                  </span>
                  <span className="font-medium">{material.price * material.quantity} ₽</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-800">Итого:</span>
            <span className="font-bold text-lg text-blue-600">{totalCost} ₽</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
