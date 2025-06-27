
import React, { useState } from 'react';
import { ArrowLeft, Plus, Phone, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import InvoicesList from '@/components/common/InvoicesList';
import CreateInvoiceModal from '@/components/common/modals/CreateInvoiceModal';
import EditInvoiceModal from '@/components/common/modals/EditInvoiceModal';
import type { Client, Invoice } from '../../types/types';

interface ClientDetailsProps {
  client: Client;
  onBack: () => void;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ client, onBack }) => {
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>(client.invoices);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  const handleCreateInvoice = (newInvoiceData: any) => {
    const invoice: Invoice = {
      ...newInvoiceData,
      id: Date.now().toString(),
      status: 'created' as const,
      createdAt: new Date().toISOString(),
    };
    setInvoices([...invoices, invoice]);
    setShowCreateInvoice(false);
  };

  const handleEditInvoice = (invoiceId: string) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      setEditingInvoice(invoice);
    }
  };

  const handleUpdateInvoice = (updatedInvoice: Invoice) => {
    setInvoices(invoices.map(inv => 
      inv.id === updatedInvoice.id ? updatedInvoice : inv
    ));
    setEditingInvoice(null);
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот счет?')) {
      setInvoices(invoices.filter(inv => inv.id !== invoiceId));
    }
  };

  const handlePayInvoice = (invoiceId: string) => {
    setInvoices(invoices.map(inv => 
      inv.id === invoiceId 
        ? { ...inv, status: 'paid' as const, paidAt: new Date().toISOString() }
        : inv
    ));
  };

  const handleCancelInvoice = (invoiceId: string) => {
    setInvoices(invoices.map(inv => 
      inv.id === invoiceId 
        ? { ...inv, status: 'cancelled' as const, cancelledAt: new Date().toISOString() }
        : inv
    ));
  };

  const createdInvoices = invoices.filter(invoice => invoice.status === 'created');
  const paidInvoices = invoices.filter(invoice => invoice.status === 'paid');
  const cancelledInvoices = invoices.filter(invoice => invoice.status === 'cancelled');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Мобильный хедер */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2 -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-gray-800 truncate">{client.name}</h1>
            <Badge 
              variant={client.status === 'active' ? 'default' : 'secondary'}
              className={client.status === 'active' ? 'bg-green-100 text-green-800' : ''}
            >
              {client.status === 'active' ? 'Активный клиент' : 'Завершен'}
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6 max-w-full">
        {/* Client Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Информация о клиенте</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700 break-all">{client.phone}</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 break-words">{client.address}</span>
            </div>
            
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-800 mb-1">Техническое задание:</p>
                <p className="text-gray-700 break-words">{client.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoices Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-xl font-semibold text-gray-800">Счета</h2>
            <Button 
              onClick={() => setShowCreateInvoice(true)}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать счет
            </Button>
          </div>

          {/* Created Invoices */}
          {createdInvoices.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800">Созданные счета</h3>
              <InvoicesList
                invoices={createdInvoices}
                onPay={handlePayInvoice}
                onEdit={handleEditInvoice}
                onDelete={handleDeleteInvoice}
                onCancel={handleCancelInvoice}
                emptyText="Нет созданных счетов"
              />
            </div>
          )}

          {/* Paid Invoices */}
          {paidInvoices.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800">Оплаченные счета</h3>
              <InvoicesList
                invoices={paidInvoices}
                emptyText="Нет оплаченных счетов"
              />
            </div>
          )}

          {/* Cancelled Invoices */}
          {cancelledInvoices.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800">Отмененные счета</h3>
              <InvoicesList
                invoices={cancelledInvoices}
                emptyText="Нет отмененных счетов"
              />
            </div>
          )}

          {invoices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Счетов пока нет</p>
              <p className="text-sm">Создайте первый счет для этого клиента</p>
            </div>
          )}
        </div>
      </div>

      <CreateInvoiceModal
        isOpen={showCreateInvoice}
        onClose={() => setShowCreateInvoice(false)}
        onSubmit={handleCreateInvoice}
      />

      {editingInvoice && (
        <EditInvoiceModal
          isOpen={!!editingInvoice}
          onClose={() => setEditingInvoice(null)}
          onSubmit={handleUpdateInvoice}
          invoice={editingInvoice}
        />
      )}
    </div>
  );
};

export default ClientDetails;
