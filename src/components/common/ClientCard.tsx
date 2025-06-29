
import React from 'react';
import { MapPin, Phone, FileText, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Client } from '../../types/types';

interface ClientCardProps {
  client: Client;
  onClick: () => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onClick }) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all duration-200 hover-scale"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {client.name}
            </h3>
            <Badge 
              variant={client.status === 'active' ? 'default' : 'secondary'}
              className={client.status === 'active' ? 'bg-green-100 text-green-800' : ''}
            >
              {client.status === 'active' ? 'Активный' : 'Завершен'}
            </Badge>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="truncate">{client.address}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <span>{client.phone}</span>
          </div>
          
          <div className="flex items-start space-x-2">
            <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
            <span className="line-clamp-2">{client.description}</span>
          </div>
        </div>

        {client.invoices.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              Счетов: {client.invoices.length} 
              {client.invoices.filter(invoice => invoice.status === 'created').length > 0 && 
                ` (${client.invoices.filter(invoice => invoice.status === 'created').length} активных)`
              }
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientCard;
