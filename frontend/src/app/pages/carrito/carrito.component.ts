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
  
  carrito: any[] = []; // Usamos any para evitar conflictos entre 'id' y 'id_producto'
  
  // Datos del formulario
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
    const datos = localStorage.getItem('cesta');
    if (datos) {
      let temporal = JSON.parse(datos);

      // 🛡️ LIMPIEZA DE DATOS (Esto arregla el $NaN y los IDs)
      this.carrito = temporal.map((producto: any) => ({
        ...producto,
        // Aseguramos que tenga un ID válido (usamos id_producto o id)
        id_producto: producto.id_producto || producto.id,
        // Aseguramos que el precio sea número (Arregla el $NaN)
        precio: Number(producto.precio) || 0,
        // Aseguramos que la cantidad sea al menos 1
        cantidad: Number(producto.cantidad) > 0 ? Number(producto.cantidad) : 1
      }));
      
      // Guardamos la versión limpia inmediatamente
      this.guardarCarrito(); 
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
    // 🛡️ FILTRO CORREGIDO: Usamos id_producto para borrar solo el específico
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
    if (this.camposCompletos()) {
      const confirmar = confirm('¿Estás segura de generar la ficha?');
      if (confirmar) {
        this.mensajeFicha = '¡Ficha generada exitosamente!';
        
        // Simulamos el proceso
        setTimeout(() => {
          this.mensajeFicha = '';
          this.telefono = '';
          this.direccion = '';
          this.referencia = '';
          this.localidad = '';
          
          // Vaciamos el carrito
          this.carrito = [];
          localStorage.removeItem('cesta');
        }, 3000);
      }
    }
  }

  irCatalogo() {
    this.router.navigate(['/catalogo']).then(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Guardar en LocalStorage
  private guardarCarrito() {
    localStorage.setItem('cesta', JSON.stringify(this.carrito));
  }
}