import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
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
  imports: [CommonModule, HttpClientModule]
})
export class CategoriPageComponent {
  productos: Producto[] = [];
  nombreCategoria: string = '';
  precioMax: number = 500;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
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
      next: (productos) => {
        this.productos = productos;
        console.log(`✅ Productos de ${categoria}:`, this.productos);
      },
      error: (err) => {
        console.error('❌ Error al cargar productos:', err);
      }
    });
  }

  getProductosPorCategoria(categoria: string): Observable<Producto[]> {
    return this.http.get<any>('assets/data/productos.json').pipe(
      map((data) => data[categoria] || [])
    );
  }

  agregarACesta(producto: Producto) {
    console.log('🛒 Agregado al carrito (NO funciona realmente):', producto);
  }

  filtrarPorPrecio(event: Event) {
    const input = event.target as HTMLInputElement;
    this.precioMax = Number(input.value);
  }

  regresarHome() {
    this.router.navigate(['/catalogo']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
