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
  mensajeFicha = '';
  telefono: string = '';
  direccion: string = '';
  referencia: string = '';

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
    });
  }

  eliminarProducto(producto: ProductoCarrito) {
    this.carrito = this.carrito.filter(p => p.id !== producto.id);
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
      this.mensajeFicha = '¡Ficha generada exitosamente!.';
      setTimeout(() => {
        this.mensajeFicha = '';
        this.telefono = '';
        this.direccion = '';
        this.referencia = '';
      }, 3000);
    }
  }

  irCatalogo() {
    this.router.navigate(['/catalogo']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
