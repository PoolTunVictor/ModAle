import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router'; // ✅ Se agrega RouterModule para usar routerLink
import { Observable, map } from 'rxjs';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad?: number;
  imagen?: string;
  etiqueta?: string;
  precioOriginal?: number;
}

@Component({
  selector: 'app-categori-page',
  templateUrl: './categori-page.component.html',
  styleUrls: ['./categori-page.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule] // ✅ Agregado RouterModule
})
export class CategoriPageComponent {
  productos: Producto[] = [];
  productosOriginales: Producto[] = [];
  nombreCategoria = '';
  precioMax = 200;

  mensajeAgregado = '';
  mostrarMensaje = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoria = params.get('categoria');
      if (categoria) {
        this.nombreCategoria = categoria;
        this.cargarProductosPorCategoria(categoria);
      }
    });
  }

  cargarProductosPorCategoria(categoria: string): void {
    this.getProductosPorCategoria(categoria).subscribe({
      next: productos => {
        this.productosOriginales = productos;
        this.productos = [...productos];
      },
      error: err => {
        console.error('❌ Error al cargar productos:', err);
      }
    });
  }

  getProductosPorCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<any>('assets/data/productos.json').pipe(
      map(data => data[categoria] || [])
    );
  }

  agregarACesta(producto: Producto): void {
    const cesta: Producto[] = JSON.parse(localStorage.getItem('cesta') || '[]');
    const index = cesta.findIndex(p => p.id === producto.id);

    if (index > -1) {
      cesta[index].cantidad! += 1;
    } else {
      cesta.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('cesta', JSON.stringify(cesta));

    this.mensajeAgregado = `${producto.nombre} se ha agregado a la cesta`;
    this.mostrarMensaje = true;
    setTimeout(() => (this.mostrarMensaje = false), 2500);
  }

  obtenerCantidadCesta(): number {
    const cesta: Producto[] = JSON.parse(localStorage.getItem('cesta') || '[]');
    return cesta.reduce((acc, item) => acc + (item.cantidad || 0), 0);
  }

  filtrarPorPrecio(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.precioMax = Number(input.value);
    this.productos = this.productosOriginales.filter(
      p => p.precio <= this.precioMax
    );
  }
}
