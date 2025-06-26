
export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface Material {
  id: string;
  name: string;
  price: number;
}

export interface Invoice {
  id: string;
  services: Service[];
  materials: (Material & { quantity: number })[];
  status: 'created' | 'cancelled' | 'paid';
  createdAt: string;
  cancelledAt?: string;
  paidAt?: string;
  pdfUrl?: string;
  pdfId?: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  address: string;
  description: string;
  status: 'active' | 'completed';
  invoices: Invoice[];
}
