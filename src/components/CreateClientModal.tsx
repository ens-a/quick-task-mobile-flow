
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useClients } from '@/hooks/useClients';

interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateClientModal: React.FC<CreateClientModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  
  const { createClient, isCreating } = useClients();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !description) return;

    createClient({
      name,
      phone,
      address,
      description,
      status: 'active',
    });

    // Reset form
    setName('');
    setPhone('');
    setAddress('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Добавить клиента
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Имя клиента</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя клиента"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Телефон</label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (999) 123-45-67"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Адрес</label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Введите адрес"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Описание работ</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Опишите техническое задание"
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isCreating ? 'Создание...' : 'Создать'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClientModal;
