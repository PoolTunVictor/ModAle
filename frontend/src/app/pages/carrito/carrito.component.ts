import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { PedidoService } from '../../core/service/pedido/pedido.service';
import { DireccionService } from '../../core/service/direccion/direccion.service';
import { DetallePedidoService } from '../../core/service/detalle_pedido/detalle_pedido.service';
import { ProductService } from '../../core/service/product/product.service';


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
  mensajeFicha: string = '';
  mensajePedido: string = '';
  colonia: string = '';
  lugar: string = '';
  referencia: string = '';
  coloniaLugar: string = '';

  // Pedido generado
  pedidoGenerado: any[] = [];
  pedidoVisible: boolean = false;

  id_usuario: number = 1; // usuario simulado

  constructor(
    private router: Router,
    private pedidoService: PedidoService,
    private direccionService: DireccionService,
    private detallePedidoService: DetallePedidoService,
    private productService: ProductService

  ) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito() {
    const datos = localStorage.getItem('cesta');
    if (datos) {
      this.carrito = JSON.parse(datos).map((producto: any) => ({
        id_producto: producto.id_producto,
        nombre: producto.nombre,
        precio: Number(producto.precio) || 0,
        imagen: producto.imagen,
        cantidad: Number(producto.cantidad) || 1,
        stock: Number(producto.stock) || 0 // <- guardamos stock
      }));
    }
  }

async aumentarCantidad(producto: any) {
  try {
    const productoBackend = await firstValueFrom(
this.productService.getById(producto.id_producto)
    );

    if (producto.cantidad < productoBackend.stock) {
      producto.cantidad++;
      producto.stock = productoBackend.stock; // actualizar stock real
      this.guardarCarrito();
    } else {
      alert(`No puedes agregar más unidades. Stock disponible: ${productoBackend.stock}`);
    }
  } catch (err) {
    console.error('Error al obtener stock actualizado', err);
  }
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
    return this.colonia.trim() !== '' &&
           this.lugar.trim() !== '';
  }

  direccionValida(): boolean {
    return this.coloniaLugar.trim() !== '' && this.referencia.trim() !== '';
  }

  async generarPedido() {
    if (!this.camposCompletos()) return;

    try {
      const direccionResp: any = await firstValueFrom(this.direccionService.crearDireccion({
        colonia: this.colonia,
        lugar: this.lugar,
        referencia: this.referencia,
        id_usuario: this.id_usuario
      }));

      const pedidoResp: any = await firstValueFrom(this.pedidoService.crearPedido({
        id_usuario: this.id_usuario,
        id_direccion: direccionResp.id_direccion,
        fecha: new Date().toISOString(),
        total: this.getTotal(),
        estado: 'Pendiente'
      }));

      for (const producto of this.carrito) {
        await firstValueFrom(this.detallePedidoService.crearDetalle({
          id_pedido: pedidoResp.id_pedido,
          id_producto: producto.id_producto,
          cantidad: producto.cantidad,
          precio_unitario: producto.precio
        }));
      }

      this.pedidoGenerado = [...this.carrito];
      this.pedidoVisible = true;
      this.carrito = [];
      localStorage.removeItem('cesta');

      this.colonia = '';
      this.lugar = '';
      this.referencia = '';
      this.coloniaLugar = '';

      this.mensajeFicha = '¡Pedido generado exitosamente!';
      setTimeout(() => this.mensajeFicha = '', 3000);

    } catch (error) {
      console.error('Error al generar pedido:', error);
      this.mensajeFicha = 'Ocurrió un error al generar el pedido';
    }
  }

  irCatalogo() {
    this.router.navigate(['/catalogo']).then(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  private guardarCarrito() {
    localStorage.setItem('cesta', JSON.stringify(this.carrito));
  }
}
