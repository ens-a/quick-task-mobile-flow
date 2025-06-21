
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Users, User } from 'lucide-react';

interface LoginFormProps {
  onLogin: (phone: string, userType: 'executor' | 'manager') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [selectedUserType, setSelectedUserType] = useState<'executor' | 'manager'>('executor');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim()) {
      onLogin(phone, selectedUserType);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Вход в систему</CardTitle>
          <p className="text-gray-600">Выберите тип пользователя и введите номер телефона</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Тип пользователя</label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={selectedUserType === 'executor' ? 'default' : 'outline'}
                  className="flex items-center justify-center space-x-2 h-12"
                  onClick={() => setSelectedUserType('executor')}
                >
                  <User className="w-4 h-4" />
                  <span>Исполнитель</span>
                </Button>
                <Button
                  type="button"
                  variant={selectedUserType === 'manager' ? 'default' : 'outline'}
                  className="flex items-center justify-center space-x-2 h-12"
                  onClick={() => setSelectedUserType('manager')}
                >
                  <Users className="w-4 h-4" />
                  <span>Руководитель</span>
                </Button>
              </div>
            </div>
            
            <div>
              <Input
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <Button type="submit" className="w-full">
              Войти
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
