import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, FormsModule]
})
export class CarritoComponent {
  carrito: ProductoCarrito[] = [];
  mensajeFicha = '';
  telefono: string = '';
  direccion: string = '';
  localidad: string = '';
  referencia: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.carrito = JSON.parse(localStorage.getItem('cesta') || '[]');
  }

  aumentarCantidad(producto: ProductoCarrito) {
    producto.cantidad++;
    this.guardarCarrito();
  }

  disminuirCantidad(producto: ProductoCarrito) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.guardarCarrito();
    }
  }

  eliminarProducto(producto: ProductoCarrito) {
    this.carrito = this.carrito.filter(p => p.id !== producto.id);
    this.guardarCarrito();
  }

  getTotal(): number {
    return this.carrito.reduce((total, p) => total + p.precio * p.cantidad, 0);
  }

  camposCompletos(): boolean {
    return this.telefono.trim() !== '' &&
           this.direccion.trim() !== '' &&
           this.referencia.trim() !== '';
  }

  generarFicha() {
    if (this.camposCompletos()) {
      const confirmar = confirm('¿Estás segura de generar la ficha?');
      if (confirmar) {
        this.mensajeFicha = '¡Ficha generada exitosamente!';
        setTimeout(() => {
          this.mensajeFicha = '';
          this.telefono = '';
          this.direccion = '';
          this.referencia = '';
          this.carrito = [];
          localStorage.removeItem('cesta');
        }, 3000);
      }
    }
  }

  irCatalogo() {
    this.router.navigate(['/catalogo']).then(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  private guardarCarrito() {
    localStorage.setItem('cesta', JSON.stringify(this.carrito));
  }
}
