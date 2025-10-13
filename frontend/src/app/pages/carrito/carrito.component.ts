import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
  etiqueta?: string;
  precioOriginal?: number;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class CarritoComponent {
  carrito: ProductoCarrito[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/productos.json').subscribe(data => {
      const todosProductos: ProductoCarrito[] = [];
      Object.values(data).forEach((categoria: any) => {
        categoria.forEach((p: any) => {
          todosProductos.push({
            id: p.id,
            nombre: p.nombre,
            precio: p.precio,
            cantidad: 1,
            imagen: p.imagen,
            etiqueta: p.etiqueta,
            precioOriginal: p.precioOriginal
          });
        });
      });
      this.carrito = todosProductos;
      console.log('Carrito inicial cargado con todos los productos:', this.carrito);
    });
  }

  // Métodos del carrito
  eliminarProducto(producto: ProductoCarrito) {
    this.carrito = this.carrito.filter(p => p.id !== producto.id);
  }

  getTotal(): number {
    return this.carrito.reduce((total, p) => total + p.precio * p.cantidad, 0);
  }

  getSubtotal(): number {
    return this.getTotal();
  }

  getTax(): number {
    const taxRate = 0.16; 
    return this.getSubtotal() * taxRate;
  }

  camposCompletos(): boolean {
    return true; // simulación
  }

  generarFicha() {
    alert('Ficha generada (simulada)');
  }

  // ✅ Navegar al catálogo
  irCatalogo() {
    this.router.navigate(['/catalogo']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
