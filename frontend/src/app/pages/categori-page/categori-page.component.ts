import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';
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

  productos: any[] = []; // Lo cambié a any[] temporalmente para evitar errores de tipo con los datos falsos
  productosOriginales: any[] = [];
  nombreCategoria = '';
  precioMax = 200;

  mensajeAgregado = '';
  mostrarMensaje = false;

  productoSeleccionado: any | null = null;

  // ✅ Lista de categorías
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

  // ✅ Categorías filtradas
  categoriasFiltradas: any[] = [];

  constructor(
    private http: HttpClient,
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

        // 🔥 Filtrar para que NO aparezca la categoría actual
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

  // 👇👇 AQUÍ ESTÁ LA MAGIA (MODIFICADO) 👇👇
  cargarProductosPorCategoria(categoria: string): void {
    
    // === 🔴 COMENTAMOS EL BACKEND REAL PORQUE ESTÁ VACÍO ===
    /*
    this.productService.getCategoria(categoria).subscribe({
      next: productos => {
        this.productosOriginales = Array.isArray(productos) ? productos : [productos];
        this.productos = [...this.productosOriginales];
      },
      error: err => {
        console.error('❌ Error al cargar productos:', err);
      }
    });
    */

    // === 🟢 AGREGAMOS LOS DATOS FALSOS (HARDCODE) ===
    // Nota: Usamos 'id_producto' porque tu función agregarACesta lo requiere.
    const datosFalsos = [
      {
        id_producto: 1, 
        nombre: 'Labial Mate Rojo',
        precio: 250,
        imagen: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80', 
        descripcion: 'Labial de larga duración con acabado mate intenso.',
        caracteristicas: 'Duración 24h, No reseca, Vegano',
        stock: 10
      },
      {
        id_producto: 2,
        nombre: 'Gloss Brillo Rosa',
        precio: 180,
        imagen: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=400&q=80',
        descripcion: 'Brillo hidratante con destellos de luz.',
        caracteristicas: 'Hidratación profunda, Sin sensación pegajosa, Aroma frutal',
        stock: 15
      }
    ];

    console.log('✅ Cargando productos falsos para visualización');
    this.productosOriginales = datosFalsos;
    this.productos = [...datosFalsos];
  }
  // 👆👆 FIN DE LA MODIFICACIÓN 👆👆

  agregarACesta(producto: any): void {
    const cesta: any[] = JSON.parse(localStorage.getItem('cesta') || '[]');
    // Aquí usamos id_producto, por eso lo puse así en los datos falsos
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

  abrirDetalles(producto: any): void {
    this.productoSeleccionado = producto;
  }

  cerrarDetalles(): void {
    this.productoSeleccionado = null;
  }

  dividirCaracteristicas(texto: string | undefined): string[] {
    return texto ? texto.split(',').map(c => c.trim()) : [];
  }
}
