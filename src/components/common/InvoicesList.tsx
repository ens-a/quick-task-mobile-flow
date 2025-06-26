
import React from 'react';
import { Invoice } from '../../types/types';
import InvoiceCard from './InvoiceCard';

interface InvoicesListProps {
  invoices: Invoice[];
  onEdit?: (invoiceId: string) => void;
  onDelete?: (invoiceId: string) => void;
  onPay?: (invoiceId: string) => void;
  onCancel?: (invoiceId: string) => void;
  emptyText?: string;
}

const InvoicesList: React.FC<InvoicesListProps> = ({
  invoices,
  onEdit,
  onDelete,
  onPay,
  onCancel,
  emptyText = 'Нет счетов',
}) => {
  if (!invoices.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <InvoiceCard
          key={invoice.id}
          invoice={invoice}
          onEdit={onEdit ? () => onEdit(invoice.id) : undefined}
          onDelete={onDelete ? () => onDelete(invoice.id) : undefined}
          onPay={onPay ? () => onPay(invoice.id) : undefined}
          onCancel={onCancel ? () => onCancel(invoice.id) : undefined}
        />
      ))}
    </div>
  );
};

export default InvoicesList;
