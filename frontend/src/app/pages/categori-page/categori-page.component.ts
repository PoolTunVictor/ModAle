import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Producto } from '../../core/models/producto';
import { ProductService } from '../../core/service/product/product.service';

@Component({
  selector: 'app-categori-page',
  templateUrl: './categori-page.component.html',
  styleUrls: ['./categori-page.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule]
})
export class CategoriPageComponent {

  productos: Producto[] = [];
  productosOriginales: Producto[] = [];
  nombreCategoria = '';
  precioMax = 200;

  mensajeAgregado = '';
  mostrarMensaje = false;

  productoSeleccionado: Producto | null = null;

  categorias = [
    { nombre: 'Nuevo', ruta: 'nuevo' },
    { nombre: 'Cuidado Facial', ruta: 'cuidado-facial' },
    { nombre: 'Accesorios', ruta: 'accesorios' },
    { nombre: 'Perfumes', ruta: 'perfumes' },
    { nombre: 'Maquillaje', ruta: 'maquillaje' },
    { nombre: 'Prendas', ruta: 'prendas' },
    { nombre: 'Cuidado Corporal', ruta: 'cuidado-corporal' },
    { nombre: 'Ofertas', ruta: 'ofertas' }
  ];

  categoriasFiltradas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoria = params.get('categoria');

      if (categoria) {
        this.nombreCategoria = categoria
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());

        this.categoriasFiltradas = this.categorias.filter(
          c => c.ruta !== categoria
        );

        this.cargarProductosPorCategoria(this.nombreCategoria);
      }
    });
  }

  irACategoria(categoriaRuta: string) {
    this.router.navigate(['/categoria', categoriaRuta]);
  }

  cargarProductosPorCategoria(categoria: string): void {
    this.productService.getCategoria(categoria).subscribe({
      next: productos => {
        // Aseguramos que siempre sea un array
        this.productosOriginales = Array.isArray(productos) ? productos : [productos];
        this.productos = [...this.productosOriginales];
      },
      error: err => {
        console.error('❌ Error al cargar productos:', err);
      }
    });
  }

  agregarACesta(producto: Producto): void {
    const cesta: any[] = JSON.parse(localStorage.getItem('cesta') || '[]');
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
    const cesta: any[] = JSON.parse(localStorage.getItem('cesta') || '[]');
    return cesta.reduce((acc, item) => acc + (item.stock || 0), 0);
  }

  abrirDetalles(producto: Producto): void {
    this.productoSeleccionado = producto;
  }

  cerrarDetalles(): void {
    this.productoSeleccionado = null;
  }

  dividirCaracteristicas(texto: string | undefined): string[] {
    return texto ? texto.split(',').map(c => c.trim()) : [];
  }
}
