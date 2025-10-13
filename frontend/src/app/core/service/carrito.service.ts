import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carritoSubject = new BehaviorSubject<ProductoCarrito[]>([]);
  carrito$ = this.carritoSubject.asObservable(); // para suscribirse desde componentes

  constructor() {
    const stored = localStorage.getItem('carrito');
    if (stored) {
      this.carritoSubject.next(JSON.parse(stored));
    }
  }

  // Devuelve el carrito como array (sin observable)
  getCarrito(): ProductoCarrito[] {
    return this.carritoSubject.getValue();
  }

  agregarProducto(producto: ProductoCarrito) {
    const carrito = this.getCarrito();
    const index = carrito.findIndex(p => p.id === producto.id);

    if (index !== -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    this.carritoSubject.next(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  quitarProducto(id: number) {
    const carrito = this.getCarrito().filter(p => p.id !== id);
    this.carritoSubject.next(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  limpiarCarrito() {
    this.carritoSubject.next([]);
    localStorage.removeItem('carrito');
  }

  calcularTotal(): number {
    return this.getCarrito().reduce((total, p) => total + p.precio * p.cantidad, 0);
  }
}
