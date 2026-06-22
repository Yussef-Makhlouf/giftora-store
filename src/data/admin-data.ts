import { adminProductImages } from '@/data/images'

export interface AdminProduct {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: 'active' | 'draft' | 'archived'
  sales: number
  revenue: number
  image: string
  personalized: boolean
}

export interface AdminOrder {
  id: string
  customer: string
  email: string
  items: number
  total: number
  date: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment: 'card' | 'cash' | 'bank'
  shipping: string
}

export interface AdminCustomer {
  id: string
  name: string
  email: string
  phone: string
  orders: number
  spent: number
  joined: string
  city: string
}

export interface AnalyticsMetric {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: string
}

export const adminProducts: AdminProduct[] = [
  { id: 'P-001', name: 'Graduation Gift Box', sku: 'GB-001', category: 'Gift Boxes', price: 18, stock: 15, status: 'active', sales: 47, revenue: 846, image: adminProductImages[0], personalized: true },
  { id: 'P-002', name: 'Birthday Celebration Box', sku: 'GB-002', category: 'Gift Boxes', price: 20, stock: 22, status: 'active', sales: 38, revenue: 760, image: adminProductImages[1], personalized: true },
  { id: 'P-003', name: 'Thank You Gift Box', sku: 'GB-003', category: 'Gift Boxes', price: 15, stock: 18, status: 'active', sales: 52, revenue: 780, image: adminProductImages[2], personalized: false },
  { id: 'P-004', name: 'Self-Care Gift Box', sku: 'GB-004', category: 'Gift Boxes', price: 22, stock: 12, status: 'active', sales: 31, revenue: 682, image: adminProductImages[3], personalized: false },
  { id: 'P-005', name: 'Chocolate & Flowers Box', sku: 'GB-005', category: 'Gift Boxes', price: 17, stock: 20, status: 'active', sales: 29, revenue: 493, image: adminProductImages[4], personalized: false },
  { id: 'P-006', name: 'Personalized Mug', sku: 'MG-001', category: 'Mugs', price: 6, stock: 50, status: 'active', sales: 94, revenue: 564, image: adminProductImages[5], personalized: true },
  { id: 'P-007', name: 'Personalized Notebook', sku: 'NB-001', category: 'Notebooks', price: 7, stock: 35, status: 'active', sales: 73, revenue: 511, image: adminProductImages[6], personalized: true },
  { id: 'P-008', name: 'Custom Name Keychain', sku: 'AC-001', category: 'Accessories', price: 5, stock: 60, status: 'active', sales: 115, revenue: 575, image: adminProductImages[7], personalized: true },
  { id: 'P-009', name: 'Office Gift Set', sku: 'GB-006', category: 'Gift Boxes', price: 19, stock: 14, status: 'active', sales: 22, revenue: 418, image: adminProductImages[8], personalized: true },
  { id: 'P-010', name: 'Couple Gift Box', sku: 'GB-007', category: 'Gift Boxes', price: 25, stock: 8, status: 'active', sales: 34, revenue: 850, image: adminProductImages[9], personalized: true },
  { id: 'P-011', name: 'Mini Gift Box - Assorted', sku: 'GB-008', category: 'Gift Boxes', price: 12, stock: 0, status: 'draft', sales: 0, revenue: 0, image: adminProductImages[10], personalized: false },
  { id: 'P-012', name: 'Luxury Pen Set', sku: 'AC-002', category: 'Accessories', price: 14, stock: 0, status: 'archived', sales: 8, revenue: 112, image: adminProductImages[11], personalized: true },
]

export const adminOrders: AdminOrder[] = [
  { id: 'ORD-1048', customer: 'Fatima Al-Sabah', email: 'fatima@email.com', items: 1, total: 25, date: '2026-06-22', status: 'shipped', payment: 'card', shipping: 'Express' },
  { id: 'ORD-1047', customer: 'Ahmed Al-Mutairi', email: 'ahmed@email.com', items: 1, total: 18, date: '2026-06-22', status: 'processing', payment: 'cash', shipping: 'Standard' },
  { id: 'ORD-1046', customer: 'Sara Al-Rashid', email: 'sara@email.com', items: 3, total: 42, date: '2026-06-21', status: 'delivered', payment: 'card', shipping: 'Express' },
  { id: 'ORD-1045', customer: 'Mohammed Al-Dosari', email: 'mohammed@email.com', items: 1, total: 20, date: '2026-06-21', status: 'delivered', payment: 'bank', shipping: 'Standard' },
  { id: 'ORD-1044', customer: 'Noura Al-Fahad', email: 'noura@email.com', items: 1, total: 15, date: '2026-06-20', status: 'delivered', payment: 'card', shipping: 'Standard' },
  { id: 'ORD-1043', customer: 'Khalid Al-Shammari', email: 'khalid@email.com', items: 2, total: 37, date: '2026-06-20', status: 'processing', payment: 'cash', shipping: 'Express' },
  { id: 'ORD-1042', customer: 'Hessa Al-Ajmi', email: 'hessa@email.com', items: 1, total: 22, date: '2026-06-19', status: 'pending', payment: 'card', shipping: 'Standard' },
  { id: 'ORD-1041', customer: 'Bader Al-Anzi', email: 'bader@email.com', items: 2, total: 13, date: '2026-06-19', status: 'cancelled', payment: 'bank', shipping: 'Standard' },
  { id: 'ORD-1040', customer: 'Laila Al-Otaibi', email: 'laila@email.com', items: 1, total: 25, date: '2026-06-18', status: 'delivered', payment: 'card', shipping: 'Express' },
  { id: 'ORD-1039', customer: 'Faisal Al-Azmi', email: 'faisal@email.com', items: 3, total: 48, date: '2026-06-18', status: 'confirmed', payment: 'cash', shipping: 'Standard' },
  { id: 'ORD-1038', customer: 'Mona Al-Enezi', email: 'mona@email.com', items: 1, total: 6, date: '2026-06-17', status: 'delivered', payment: 'card', shipping: 'Standard' },
  { id: 'ORD-1037', customer: 'Abdullah Al-Rashidi', email: 'abdullah@email.com', items: 2, total: 25, date: '2026-06-17', status: 'delivered', payment: 'bank', shipping: 'Express' },
]

export const adminCustomers: AdminCustomer[] = [
  { id: 'C-001', name: 'Fatima Al-Sabah', email: 'fatima@email.com', phone: '+965 9000 1001', orders: 5, spent: 112, joined: 'Jan 2026', city: 'Kuwait City' },
  { id: 'C-002', name: 'Ahmed Al-Mutairi', email: 'ahmed@email.com', phone: '+965 9000 1002', orders: 3, spent: 54, joined: 'Mar 2026', city: 'Salmiya' },
  { id: 'C-003', name: 'Sara Al-Rashid', email: 'sara@email.com', phone: '+965 9000 1003', orders: 8, spent: 210, joined: 'Feb 2026', city: 'Hawalli' },
  { id: 'C-004', name: 'Mohammed Al-Dosari', email: 'mohammed@email.com', phone: '+965 9000 1004', orders: 2, spent: 35, joined: 'Apr 2026', city: 'Farwaniya' },
  { id: 'C-005', name: 'Noura Al-Fahad', email: 'noura@email.com', phone: '+965 9000 1005', orders: 6, spent: 145, joined: 'Jan 2026', city: 'Ahmadi' },
  { id: 'C-006', name: 'Khalid Al-Shammari', email: 'khalid@email.com', phone: '+965 9000 1006', orders: 4, spent: 89, joined: 'Feb 2026', city: 'Kuwait City' },
  { id: 'C-007', name: 'Hessa Al-Ajmi', email: 'hessa@email.com', phone: '+965 9000 1007', orders: 1, spent: 22, joined: 'Jun 2026', city: 'Salmiya' },
  { id: 'C-008', name: 'Bader Al-Anzi', email: 'bader@email.com', phone: '+965 9000 1008', orders: 3, spent: 47, joined: 'Mar 2026', city: 'Jahra' },
  { id: 'C-009', name: 'Laila Al-Otaibi', email: 'laila@email.com', phone: '+965 9000 1009', orders: 7, spent: 198, joined: 'Jan 2026', city: 'Kuwait City' },
  { id: 'C-010', name: 'Faisal Al-Azmi', email: 'faisal@email.com', phone: '+965 9000 1010', orders: 2, spent: 63, joined: 'May 2026', city: 'Hawalli' },
]

export const monthlyRevenue = [
  { month: 'Jan', revenue: 1250, orders: 28 },
  { month: 'Feb', revenue: 1800, orders: 35 },
  { month: 'Mar', revenue: 1520, orders: 31 },
  { month: 'Apr', revenue: 2450, orders: 42 },
  { month: 'May', revenue: 1980, orders: 38 },
  { month: 'Jun', revenue: 2890, orders: 52 },
]

export const salesByCategory = [
  { category: 'Gift Boxes', sales: 253, revenue: 4829 },
  { category: 'Mugs', sales: 94, revenue: 564 },
  { category: 'Notebooks', sales: 73, revenue: 511 },
  { category: 'Accessories', sales: 123, revenue: 687 },
]

export const topProducts = [
  { name: 'Custom Name Keychain', sales: 115, revenue: 575, stock: 60 },
  { name: 'Personalized Mug', sales: 94, revenue: 564, stock: 50 },
  { name: 'Personalized Notebook', sales: 73, revenue: 511, stock: 35 },
  { name: 'Thank You Gift Box', sales: 52, revenue: 780, stock: 18 },
  { name: 'Graduation Gift Box', sales: 47, revenue: 846, stock: 15 },
]
