
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

export interface Order {
  id: string;
  services: Service[];
  materials: (Material & { quantity: number })[];
  status: 'active' | 'completed';
  createdAt: string;
  completedAt?: string;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  address: string;
  description: string;
  status: 'active' | 'completed';
  orders: Order[];
}
