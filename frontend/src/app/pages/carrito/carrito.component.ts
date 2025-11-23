import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CarritoComponent implements OnInit {

  carrito: any[] = []; 

  // Datos del formulario
  mensajeFicha = '';
  telefono: string = '';
  direccion: string = '';
  localidad: string = '';
  referencia: string = '';

  // Pedido generado
  pedidoGenerado: any[] = [];
  pedidoVisible: boolean = false; // controla si se muestra el botón y el detalle

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito() {
    const datos = localStorage.getItem('cesta');
    if (datos) {
      let temporal = JSON.parse(datos);
      this.carrito = temporal.map((producto: any) => ({
        ...producto,
        id_producto: producto.id_producto || producto.id,
        precio: Number(producto.precio) || 0,
        cantidad: Number(producto.cantidad) > 0 ? Number(producto.cantidad) : 1
      }));
    }
  }

  aumentarCantidad(producto: any) {
    producto.cantidad++;
    this.guardarCarrito();
  }

  disminuirCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.guardarCarrito();
    }
  }

  eliminarProducto(producto: any) {
    this.carrito = this.carrito.filter(p => p.id_producto !== producto.id_producto);
    this.guardarCarrito();
  }

  getTotal(): number {
    return this.carrito.reduce((total, p) => total + (p.precio * p.cantidad), 0);
  }

  camposCompletos(): boolean {
    return this.telefono.trim() !== '' &&
           this.direccion.trim() !== '' &&
           this.referencia.trim() !== '' &&
           this.localidad.trim() !== '';
  }

  generarFicha() {
    if (!this.camposCompletos()) return;

    if (confirm('¿Estás segura de generar la ficha?')) {
      this.mensajeFicha = '¡Ficha generada exitosamente!';

      // Guardamos el pedido antes de vaciar el carrito
      this.pedidoGenerado = [...this.carrito];
      this.pedidoVisible = true; // Activamos botón y detalle

      // Limpiamos carrito y localStorage
      this.carrito = [];
      localStorage.removeItem('cesta');

      // Limpiamos solo los campos del formulario
      setTimeout(() => {
        this.mensajeFicha = '';
        this.telefono = '';
        this.direccion = '';
        this.referencia = '';
        this.localidad = '';
      }, 3000);
    }
  }


  irCatalogo() {
    this.router.navigate(['/catalogo']).then(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  private guardarCarrito() {
    localStorage.setItem('cesta', JSON.stringify(this.carrito));
  }

  getTotalPedidoGenerado(): number {
    return this.pedidoGenerado.reduce((total, p) => total + p.precio * p.cantidad, 0);
  }
}
