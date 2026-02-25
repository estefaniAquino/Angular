export interface Ingrediente {
  id?: string;
  nombre: string;
  unidadBase: string;
  costoUnidad: number;
  stockActual: number;
  notas: string;
}

export interface RecetaIngredienteInput {
  ingredienteId: string;
  cantidadUsada: number;
}

export interface Receta {
  id?: string;
  nombre: string;
  categoria: string;
  porciones: number;
  costoEmpaque: number;
  costoManoObra: number;
  gastosFijos: number;
  margenGanancia: number;
  ingredientes: RecetaIngredienteInput[];
  ingredientesDetalle?: Array<{
    ingredienteId: string;
    nombre: string;
    unidadBase: string;
    costoUnidad: number;
    cantidadUsada: number;
    costoUsado: number;
  }>;
  subtotalIngredientes?: number;
  costoTotal?: number;
  precioSugerido?: number;
  costoPorPorcion?: number;
  precioPorPorcion?: number;
  notas: string;
}

export interface VentaItem {
  recetaId: string;
  cantidad: number;
  precioUnitario?: number;
}

export interface Venta {
  id?: string;
  fecha: string;
  canal: string;
  items: VentaItem[];
  totalVenta?: number;
  notas: string;
}
