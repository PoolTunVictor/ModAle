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
  productosOriginales: Producto[] = [];
  nombreCategoria: string = '';
  precioMax: number = 200;


  mensajeAgregado: string = '';
  mostrarMensaje: boolean = false;

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
      this.productosOriginales = productos; 
      this.productos = [...productos];     
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
    const cesta: Producto[] = JSON.parse(localStorage.getItem('cesta') || '[]');
    const index = cesta.findIndex(p => p.id === producto.id);

    if (index > -1) {
      cesta[index].cantidad! += 1;
    } else {
      cesta.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('cesta', JSON.stringify(cesta));
    console.log('🛒 Producto agregado al carrito:', producto);

    
    this.mensajeAgregado = `${producto.nombre} se ha agregado a la cesta`;
    this.mostrarMensaje = true;
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 2500);
  }

  obtenerCantidadCesta(): number {
    const cesta: Producto[] = JSON.parse(localStorage.getItem('cesta') || '[]');
    return cesta.reduce((acc, item) => acc + (item.cantidad || 0), 0);
  }

  irAlCarrito() {
    this.router.navigate(['/carrito']);
  }

  filtrarPorPrecio(event: Event) {
    const input = event.target as HTMLInputElement;
    this.precioMax = Number(input.value);

      this.productos = this.productosOriginales.filter(p => p.precio <= this.precioMax);

  }

  regresarHome() {
    this.router.navigate(['/catalogo']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
