
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, TrendingUp, FileText, DollarSign, Users } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('month');
  
  // Mock data for today
  const todayStats = {
    orders: 5,
    completedOrders: 3,
    revenue: 25000,
    activeExecutors: 8
  };
  
  // Mock data for month
  const monthStats = {
    orders: 45,
    completedOrders: 32,
    revenue: 180000,
    activeExecutors: 12
  };

  const executorStats = [
    { name: 'Иван Петров', orders: 8, completed: 6, revenue: 45000 },
    { name: 'Мария Сидорова', orders: 6, completed: 5, revenue: 38000 },
    { name: 'Алексей Козлов', orders: 7, completed: 4, revenue: 32000 },
  ];

  return (
    <div className="space-y-6">
      {/* Today's Analytics */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Аналитика за сегодня
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Заказы</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.orders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Закрыто заказов</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.completedOrders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Выручка</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.revenue.toLocaleString()} ₽</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активные исполнители</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayStats.activeExecutors}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Period Analytics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Аналитика за период
          </h3>
          <div className="flex space-x-2">
            <Button
              variant={dateRange === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange('week')}
            >
              Неделя
            </Button>
            <Button
              variant={dateRange === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange('month')}
            >
              Месяц
            </Button>
            <Button
              variant={dateRange === 'custom' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange('custom')}
            >
              Период
            </Button>
          </div>
        </div>
        
        {dateRange === 'custom' && (
          <div className="flex space-x-2 mb-4">
            <Input type="date" className="w-auto" />
            <span className="self-center">—</span>
            <Input type="date" className="w-auto" />
            <Button>Применить</Button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthStats.orders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Закрыто заказов</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthStats.completedOrders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Общая выручка</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthStats.revenue.toLocaleString()} ₽</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего исполнителей</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthStats.activeExecutors}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Executor Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Статистика по исполнителям</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {executorStats.map((executor, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{executor.name}</h4>
                </div>
                <div className="flex space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{executor.orders}</div>
                    <div className="text-gray-500">Заказов</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{executor.completed}</div>
                    <div className="text-gray-500">Закрыто</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{executor.revenue.toLocaleString()} ₽</div>
                    <div className="text-gray-500">Выручка</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
