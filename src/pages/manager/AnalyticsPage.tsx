
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, FileText, DollarSign, Users } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('today');
  
  // Mock data for different periods
  const getStatsForPeriod = (period: string) => {
    switch (period) {
      case 'today':
        return {
          orders: 5,
          completedOrders: 3,
          revenue: 25000,
          activeExecutors: 8
        };
      case 'week':
        return {
          orders: 25,
          completedOrders: 18,
          revenue: 95000,
          activeExecutors: 10
        };
      case 'month':
        return {
          orders: 45,
          completedOrders: 32,
          revenue: 180000,
          activeExecutors: 12
        };
      default:
        return {
          orders: 45,
          completedOrders: 32,
          revenue: 180000,
          activeExecutors: 12
        };
    }
  };

  const currentStats = getStatsForPeriod(dateRange);

  const executorStats = [
    { name: 'Иван Петров', orders: 8, completed: 6, revenue: 45000 },
    { name: 'Мария Сидорова', orders: 6, completed: 5, revenue: 38000 },
    { name: 'Алексей Козлов', orders: 7, completed: 4, revenue: 32000 },
  ];

  return (
    <div className="space-y-6">
      {/* Period Analytics */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 flex-shrink-0" />
            <span className="truncate">Аналитика за период</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={dateRange === 'today' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange('today')}
            >
              Сегодня
            </Button>
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
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <Input type="date" className="w-full sm:w-auto" />
            <span className="self-center text-center sm:text-left">—</span>
            <Input type="date" className="w-full sm:w-auto" />
            <Button className="w-full sm:w-auto">Применить</Button>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStats.orders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Закрыто заказов</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStats.completedOrders}</div>
            </CardContent>
          </Card>
          
          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Общая выручка</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStats.revenue.toLocaleString()} ₽</div>
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
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium truncate">{executor.name}</h4>
                </div>
                <div className="flex justify-between sm:justify-start sm:space-x-6 text-sm">
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
