import React from 'react';
import { Calendar, Package, Wrench, Check, Edit, Trash2, FileText, Link, Copy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Order } from '../../types/types';

interface OrderCardProps {
  order: Order;
  onComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onGeneratePDF: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ 
  order, 
  onComplete, 
  onEdit, 
  onDelete, 
  onGeneratePDF 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'created':
        return { text: 'Создан', className: 'bg-gray-100 text-gray-800' };
      case 'invoiced':
        return { text: 'Выставлен счет', className: 'bg-blue-100 text-blue-800' };
      case 'completed':
        return { text: 'Завершен', className: 'bg-green-100 text-green-800' };
      default:
        return { text: 'Неизвестно', className: 'bg-gray-100 text-gray-800' };
    }
  };

  const statusInfo = getStatusInfo(order.status);
  const totalCost = order.services.reduce((sum, service) => sum + service.price, 0) +
                   order.materials.reduce((sum, material) => sum + material.price * material.quantity, 0);

  const handleCopyPdfLink = () => {
    if (order.pdfUrl) {
      navigator.clipboard.writeText(order.pdfUrl);
      // В реальном приложении здесь бы был тост с уведомлением
      console.log('PDF link copied to clipboard');
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className={statusInfo.className}>
                {statusInfo.text}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Создан: {formatDate(order.createdAt)}</span>
            </div>
            
            {order.invoicedAt && (
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                <FileText className="w-4 h-4" />
                <span>Счет выставлен: {formatDate(order.invoicedAt)}</span>
              </div>
            )}
            
            {order.completedAt && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Check className="w-4 h-4" />
                <span>Завершен: {formatDate(order.completedAt)}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-row space-x-2">
            {order.status !== 'completed' && (
              <>
                <Button
                  onClick={onEdit}
                  size="sm"
                  variant="outline"
                  className="h-8"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={onDelete}
                  size="sm"
                  variant="outline"
                  className="h-8 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
            
            {order.status === 'created' && (
              <Button
                onClick={onGeneratePDF}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 h-8"
              >
                <FileText className="w-4 h-4" />
              </Button>
            )}
            
            {order.status !== 'completed' && (
              <Button
                onClick={onComplete}
                size="sm"
                className="bg-green-600 hover:bg-green-700 h-8"
              >
                <Check className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* PDF Link */}
        {order.pdfUrl && (
          <div className="mb-4 p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">PDF Инвойс</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => window.open(order.pdfUrl, '_blank')}
                  size="sm"
                  variant="outline"
                  className="h-7 px-2"
                >
                  <Link className="w-3 h-3" />
                </Button>
                <Button
                  onClick={handleCopyPdfLink}
                  size="sm"
                  variant="outline"
                  className="h-7 px-2"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        )}

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
