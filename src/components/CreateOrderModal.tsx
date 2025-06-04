
import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { availableServices, availableMaterials } from '../data/mockData';
import type { Order, Service, Material } from '../types/types';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (order: Omit<Order, 'id'>) => void;
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<(Material & { quantity: number })[]>([]);

  const handleServiceToggle = (service: Service, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, service]);
    } else {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    }
  };

  const handleMaterialToggle = (material: Material, checked: boolean) => {
    if (checked) {
      setSelectedMaterials([...selectedMaterials, { ...material, quantity: 1 }]);
    } else {
      setSelectedMaterials(selectedMaterials.filter(m => m.id !== material.id));
    }
  };

  const updateMaterialQuantity = (materialId: string, change: number) => {
    setSelectedMaterials(selectedMaterials.map(material => 
      material.id === materialId 
        ? { ...material, quantity: Math.max(1, material.quantity + change) }
        : material
    ));
  };

  const handleSubmit = () => {
    if (selectedServices.length === 0 && selectedMaterials.length === 0) {
      return;
    }

    const order: Omit<Order, 'id'> = {
      services: selectedServices,
      materials: selectedMaterials,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    onSubmit(order);
    setSelectedServices([]);
    setSelectedMaterials([]);
  };

  const totalCost = selectedServices.reduce((sum, service) => sum + service.price, 0) +
                   selectedMaterials.reduce((sum, material) => sum + material.price * material.quantity, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Создать заказ
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Services */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Услуги</h3>
            <div className="space-y-2">
              {availableServices.map((service) => (
                <Card key={service.id} className="p-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedServices.some(s => s.id === service.id)}
                      onCheckedChange={(checked) => handleServiceToggle(service, checked as boolean)}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium">{service.name}</span>
                        <span className="text-sm font-semibold text-blue-600">{service.price} ₽</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Расходники</h3>
            <div className="space-y-2">
              {availableMaterials.map((material) => {
                const selected = selectedMaterials.find(m => m.id === material.id);
                return (
                  <Card key={material.id} className="p-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={!!selected}
                        onCheckedChange={(checked) => handleMaterialToggle(material, checked as boolean)}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium">{material.name}</span>
                          <span className="text-sm font-semibold text-blue-600">{material.price} ₽</span>
                        </div>
                        {selected && (
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateMaterialQuantity(material.id, -1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-sm font-medium min-w-[20px] text-center">
                              {selected.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateMaterialQuantity(material.id, 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Total and Submit */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Итого:</span>
              <span className="text-blue-600">{totalCost} ₽</span>
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={selectedServices.length === 0 && selectedMaterials.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Создать заказ
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrderModal;
