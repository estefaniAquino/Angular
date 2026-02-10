export interface InventoryItem {
  id?: string;
  nombre: string;
  categoria: string;
  unidadMedida: string;
  quantity: number;
  unitCost: number;
  salePrice: number;
  totalCost?: number;
  potentialRevenue?: number;
}

export interface CostSummary {
  totalInversion: number;
  totalVentaPotencial: number;
  utilidadEstimada: number;
}
