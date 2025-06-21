
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, FileText, Eye, Copy, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock data
  const invoices: Invoice[] = [
    {
      id: '1',
      number: 'INV-2024-001',
      clientName: 'ООО "Стройком"',
      amount: 45000,
      status: 'paid',
      createdAt: '2024-01-15',
      pdfUrl: 'https://example.com/invoices/inv-001.pdf'
    },
    {
      id: '2',
      number: 'INV-2024-002',
      clientName: 'ИП Иванов А.А.',
      amount: 28000,
      status: 'issued',
      createdAt: '2024-01-18',
      pdfUrl: 'https://example.com/invoices/inv-002.pdf'
    },
    {
      id: '3',
      number: 'INV-2024-003',
      clientName: 'ООО "РемСтрой"',
      amount: 67000,
      status: 'closed',
      createdAt: '2024-01-20',
      pdfUrl: 'https://example.com/invoices/inv-003.pdf'
    }
  ];

  const filteredInvoices = invoices.filter(invoice =>
    invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    // Here you would show a toast notification
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Поиск счетов..."
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

      <div className="grid gap-4">
        {filteredInvoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{invoice.number}</h3>
                      <p className="text-sm text-gray-600">{invoice.clientName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{invoice.amount.toLocaleString()} ₽</div>
                      <div className="text-sm text-gray-500">Сумма счета</div>
                    </div>
                    <div>
                      {getStatusBadge(invoice.status)}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Создан: {new Date(invoice.createdAt).toLocaleDateString('ru-RU')}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  {invoice.pdfUrl && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(invoice.pdfUrl, '_blank')}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Открыть PDF
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCopyLink(invoice.pdfUrl!)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Копировать ссылку
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Скачать
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? 'Счета не найдены' : 'Нет счетов'}
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
