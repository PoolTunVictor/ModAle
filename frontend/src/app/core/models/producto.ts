export interface Producto {
  id_producto?: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  caracteristicas: string;
  precio: number;
  stock: number;
  activo: boolean;
  nuevo: boolean;
  oferta: boolean;
  imagen: string | null; 
}