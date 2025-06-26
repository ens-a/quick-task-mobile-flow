
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, FileText, Copy, Link, CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Invoice {
  id: string;
  number: string;
  clientName: string;
  amount: number;
  status: 'issued' | 'closed' | 'paid';
  createdAt: string;
  pdfUrl?: string;
}

const InvoicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock data
  const invoices: Invoice[] = [
    {
      id: '1',
      number: 'INV-2024-001',
      clientName: 'ООО "Стройком"',
      amount: 45000,
      status: 'paid',
      createdAt: '2024-01-15T10:30:00Z',
      pdfUrl: 'https://example.com/invoices/inv-001.pdf'
    },
    {
      id: '2',
      number: 'INV-2024-002',
      clientName: 'ИП Иванов А.А.',
      amount: 28000,
      status: 'issued',
      createdAt: '2024-01-18T14:20:00Z',
      pdfUrl: 'https://example.com/invoices/inv-002.pdf'
    },
    {
      id: '3',
      number: 'INV-2024-003',
      clientName: 'ООО "РемСтрой"',
      amount: 67000,
      status: 'closed',
      createdAt: '2024-01-20T09:15:00Z',
      pdfUrl: 'https://example.com/invoices/inv-003.pdf'
    },
    {
      id: '4',
      number: 'INV-2024-004',
      clientName: 'ЗАО "БизнесСтрой"',
      amount: 152000,
      status: 'paid',
      createdAt: '2024-01-22T16:45:00Z',
      pdfUrl: 'https://example.com/invoices/inv-004.pdf'
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    const invoiceDate = new Date(invoice.createdAt);
    const matchesDateFrom = !dateFrom || invoiceDate >= dateFrom;
    const matchesDateTo = !dateTo || invoiceDate <= dateTo;
    
    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'issued':
        return <Badge className="bg-yellow-100 text-yellow-800">Выставлен</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800">Закрыт</Badge>;
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Оплачен</Badge>;
      default:
        return <Badge>Неизвестно</Badge>;
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    console.log('PDF link copied to clipboard');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const clearDateFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Header with search and create button */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск по клиенту или номеру счета..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Создать счет
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Статус:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="issued">Выставлен</SelectItem>
                  <SelectItem value="closed">Закрыт</SelectItem>
                  <SelectItem value="paid">Оплачен</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Дата с:</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-40 justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "dd.MM.yyyy") : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Дата до:</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-40 justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "dd.MM.yyyy") : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {(dateFrom || dateTo) && (
              <Button variant="outline" size="sm" onClick={clearDateFilters}>
                Очистить даты
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Номер</TableHead>
                <TableHead>Дата создания</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead className="w-24">PDF</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell>{formatDate(invoice.createdAt)}</TableCell>
                  <TableCell>{invoice.clientName}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="font-semibold">
                    {invoice.amount.toLocaleString()} ₽
                  </TableCell>
                  <TableCell>
                    {invoice.pdfUrl && (
                      <div className="flex space-x-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => window.open(invoice.pdfUrl, '_blank')}
                        >
                          <Link className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleCopyLink(invoice.pdfUrl!)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm || statusFilter !== 'all' || dateFrom || dateTo 
            ? 'Счета не найдены' 
            : 'Нет счетов'
          }
        </div>
      )}

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создать счет</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Номер счета" />
            <Input placeholder="Клиент" />
            <Input placeholder="Сумма" type="number" />
            <div className="flex space-x-2">
              <Button className="flex-1">Создать</Button>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoicesPage;
