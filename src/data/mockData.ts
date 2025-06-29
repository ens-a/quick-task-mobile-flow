
import type { Client, Service, Material } from '../types/types';

export const availableServices: Service[] = [
  { id: '1', name: 'Диагностика системы', price: 1500 },
  { id: '2', name: 'Установка оборудования', price: 3000 },
  { id: '3', name: 'Настройка программного обеспечения', price: 2500 },
  { id: '4', name: 'Техническое обслуживание', price: 2000 },
  { id: '5', name: 'Замена комплектующих', price: 1800 },
  { id: '6', name: 'Консультация специалиста', price: 1000 },
];

export const availableMaterials: Material[] = [
  { id: '1', name: 'Кабель Ethernet (1м)', price: 150 },
  { id: '2', name: 'Разъем RJ-45', price: 50 },
  { id: '3', name: 'Крепежные элементы', price: 200 },
  { id: '4', name: 'Изоляционная лента', price: 80 },
  { id: '5', name: 'Термоусадочная трубка', price: 120 },
  { id: '6', name: 'Монтажная коробка', price: 300 },
];

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Иван Петров',
    phone: '+7 (999) 123-45-67',
    address: 'г. Москва, ул. Ленина, д. 15, кв. 42',
    description: 'Требуется установка и настройка домашней сети Wi-Fi. Проблемы с подключением в дальних комнатах.',
    status: 'active',
    invoices: [
      {
        id: '1',
        services: [
          { id: '1', name: 'Диагностика системы', price: 1500 },
          { id: '2', name: 'Установка оборудования', price: 3000 }
        ],
        materials: [
          { id: '1', name: 'Кабель Ethernet (1м)', price: 150, quantity: 3 },
          { id: '3', name: 'Крепежные элементы', price: 200, quantity: 1 }
        ],
        status: 'created',
        createdAt: '2024-06-01T10:00:00Z'
      },
      {
        id: '3',
        services: [
          { id: '4', name: 'Техническое обслуживание', price: 2000 }
        ],
        materials: [
          { id: '4', name: 'Изоляционная лента', price: 80, quantity: 2 }
        ],
        status: 'paid',
        createdAt: '2024-06-10T14:30:00Z',
        paidAt: '2024-06-12T09:15:00Z'
      }
    ]
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    phone: '+7 (999) 234-56-78',
    address: 'г. Москва, пр. Мира, д. 28, офис 15',
    description: 'Необходимо настроить корпоративную сеть на 10 рабочих мест. Требуется подключение принтера.',
    status: 'active',
    invoices: [
      {
        id: '4',
        services: [
          { id: '2', name: 'Установка оборудования', price: 3000 },
          { id: '3', name: 'Настройка программного обеспечения', price: 2500 },
          { id: '6', name: 'Консультация специалиста', price: 1000 }
        ],
        materials: [
          { id: '1', name: 'Кабель Ethernet (1м)', price: 150, quantity: 10 },
          { id: '2', name: 'Разъем RJ-45', price: 50, quantity: 12 },
          { id: '6', name: 'Монтажная коробка', price: 300, quantity: 3 }
        ],
        status: 'created',
        createdAt: '2024-06-15T11:20:00Z'
      }
    ]
  },
  {
    id: '3',
    name: 'Алексей Козлов',
    phone: '+7 (999) 345-67-89',
    address: 'г. Москва, ул. Гагарина, д. 7, кв. 89',
    description: 'Модернизация домашней сети, установка системы умного дома.',
    status: 'completed',
    invoices: [
      {
        id: '2',
        services: [
          { id: '2', name: 'Установка оборудования', price: 3000 },
          { id: '3', name: 'Настройка программного обеспечения', price: 2500 }
        ],
        materials: [
          { id: '1', name: 'Кабель Ethernet (1м)', price: 150, quantity: 5 },
          { id: '6', name: 'Монтажная коробка', price: 300, quantity: 2 }
        ],
        status: 'paid',
        createdAt: '2024-05-15T14:30:00Z',
        paidAt: '2024-05-20T16:45:00Z'
      },
      {
        id: '5',
        services: [
          { id: '5', name: 'Замена комплектующих', price: 1800 }
        ],
        materials: [
          { id: '5', name: 'Термоусадочная трубка', price: 120, quantity: 3 }
        ],
        status: 'cancelled',
        createdAt: '2024-05-25T09:00:00Z',
        cancelledAt: '2024-05-26T12:00:00Z'
      }
    ]
  },
  {
    id: '4',
    name: 'Елена Васильева',
    phone: '+7 (999) 456-78-90',
    address: 'г. Москва, ул. Пушкина, д. 12, кв. 5',
    description: 'Проблемы с интернет-соединением, нужна диагностика и устранение неполадок.',
    status: 'active',
    invoices: [
      {
        id: '6',
        services: [
          { id: '1', name: 'Диагностика системы', price: 1500 },
          { id: '6', name: 'Консультация специалиста', price: 1000 }
        ],
        materials: [],
        status: 'paid',
        createdAt: '2024-06-20T16:45:00Z',
        paidAt: '2024-06-21T10:30:00Z'
      }
    ]
  }
];
