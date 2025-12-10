import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PedidoService } from '../../core/service/pedido/pedido.service';
import { DireccionService } from '../../core/service/direccion/direccion.service';
import { DetallePedidoService } from '../../core/service/detalle_pedido/detalle_pedido.service';
import { ProductService } from '../../core/service/product/product.service';
import { LocalidadService } from '../../core/service/localidad/localidad.service';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  mensajeFicha: string = '';
  colonia: string = '';
  referencia: string = '';
  coloniaLugar: string = '';
  localidades: any[] = [];
  pedidoGenerado: any[] = [];
  pedidoVisible: boolean = false;

  constructor(
    private router: Router,
    private pedidoService: PedidoService,
    private direccionService: DireccionService,
    private detallePedidoService: DetallePedidoService,
    private productService: ProductService,
    private localidadService: LocalidadService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarCarrito();
    this.cargarLocalidades();
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
       stock: producto.stock
      }));
    }
  }

  cargarLocalidades(): void {
    this.localidadService.getLocalidades().subscribe({
      next: (data) => this.localidades = data,
      error: (err) => console.error('Error al cargar localidades', err)
    });
  }

  async aumentarCantidad(producto: any) {
    try {
      const productoBackend = await firstValueFrom(
        this.productService.getById(producto.id_producto)
      );
      if (producto.cantidad < productoBackend.stock) {
        producto.cantidad++;
        this.guardarCarrito();
      } else {
        alert(`Stock disponible: ${productoBackend.stock}`);
      }
    } catch (err) {
      console.error('Error obteniendo stock', err);
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
    return this.carrito.reduce((t, p) => t + p.precio * p.cantidad, 0);
  }

  camposCompletos(): boolean {
    return this.colonia.trim() !== '' && this.coloniaLugar !== '';
  }

  // --------------------------------------------------
  // 🚀 MÉTODO ACTUALIZADO: ENVÍA EL PEDIDO CON DETALLES
  // --------------------------------------------------
  async generarPedido() {
    if (!this.camposCompletos()) {
      this.mensajeFicha = 'Completa todos los campos de dirección';
      return;
    }

    try {
      // 1. Crear dirección
      const direccionResp: any = await firstValueFrom(
        this.direccionService.crearDireccion({
          colonia: this.colonia,
          referencia: this.referencia,
          id_localidad: Number(this.coloniaLugar)
        })
      );

      // 2. Crear pedido con sus detalles
      const pedidoResp: any = await firstValueFrom(
        this.pedidoService.crearPedido({
          id_direccion: direccionResp.id_direccion,
          total: this.getTotal(),
          detalles: this.carrito.map(p => ({
            id_producto: p.id_producto,
            cantidad: p.cantidad,
            precio_unitario: p.precio
          }))
        })
      );

      // 3. Finalización
      this.pedidoGenerado = [...this.carrito];
      this.pedidoVisible = true;

      this.carrito = [];
      localStorage.removeItem('cesta');
      this.colonia = '';
      this.coloniaLugar = '';
      this.referencia = '';

      this.mensajeFicha = '¡Pedido generado exitosamente!';
      setTimeout(() => this.mensajeFicha = '', 3000);

    } catch (error) {
      console.error('Error al generar pedido:', error);
      this.mensajeFicha = 'Ocurrió un error al generar el pedido';
    }
  }

  irCatalogo() {
    this.router.navigate(['/catalogo']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  private guardarCarrito() {
    localStorage.setItem('cesta', JSON.stringify(this.carrito));
  }
}
