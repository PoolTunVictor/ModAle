import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router'; // ✅ Se agrega RouterModule para usar routerLink
import { Observable, map } from 'rxjs';
import { Producto } from '../../core/models/producto';
import { ProductService } from '../../core/service/product/product.service';


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
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoria = params.get('categoria');
      if (categoria) {
        this.nombreCategoria = categoria;
        const categoriaFormateada = categoria
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
        this.cargarProductosPorCategoria(categoriaFormateada);
      }
    });
  }

  cargarProductosPorCategoria(categoria: string): void {
    this.productService.getCategoria(categoria).subscribe({
      next: productos => {
        this.productosOriginales = Array.isArray(productos) ? productos : [productos];
        this.productos = [...this.productosOriginales];
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
    const index = cesta.findIndex(p => p.id_producto === producto.id_producto);

    if (index > -1) {
      cesta[index].stock! += 1;
    } else {
      cesta.push({ ...producto, stock: 1 });
    }

    localStorage.setItem('cesta', JSON.stringify(cesta));

    this.mensajeAgregado = `${producto.nombre} se ha agregado a la cesta`;
    this.mostrarMensaje = true;
    setTimeout(() => (this.mostrarMensaje = false), 2500);
  }

  obtenerCantidadCesta(): number {
    const cesta: Producto[] = JSON.parse(localStorage.getItem('cesta') || '[]');
    return cesta.reduce((acc, item) => acc + (item.stock || 0), 0);
  }

  filtrarPorPrecio(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.precioMax = Number(input.value);
    this.productos = this.productosOriginales.filter(
      p => p.precio <= this.precioMax
    );
  }
}
