/**
 * Modelo principal de cada producto del inventario.
 */
export interface Producto {
  id?: string;
  nombre: string;
  categoria: string;
  unidad: string;
  cantidad: number;
  costoIngredientes: number;
  costoEmpaque: number;
  costoManoObra: number;
  margenGanancia: number;
  costoTotal?: number;
  precioVenta?: number;
  notas: string;
  createdAt?: string;
  updatedAt?: string;
}
