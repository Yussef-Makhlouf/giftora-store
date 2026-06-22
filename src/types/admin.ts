export interface DashboardMetric {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
}

export interface InventoryItem {
  productId: string;
  productName: string;
  category: string;
  sku: string;
  stock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}
