import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Producto } from '../../core/models/producto';
import { ProductService } from '../../core/service/product/product.service';

// Extender Producto para agregar propiedad de mensaje
interface ProductoConMensaje extends Producto {
  mostrarMensaje?: boolean;
}

@Component({
  selector: 'app-categori-page',
  templateUrl: './categori-page.component.html',
  styleUrls: ['./categori-page.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule]
})
export class CategoriPageComponent {

  productos: ProductoConMensaje[] = [];
  productosOriginales: ProductoConMensaje[] = [];
  nombreCategoria = '';
  precioMax = 200;

  productoSeleccionado: ProductoConMensaje | null = null;

  categorias = [
    
    { nombre: 'Cuidado Facial', ruta: 'cuidado-facial' },
    { nombre: 'Accesorios', ruta: 'accesorios' },
    { nombre: 'Perfumes', ruta: 'perfumes' },
    { nombre: 'Maquillaje', ruta: 'maquillaje' },
    { nombre: 'Prendas', ruta: 'prendas' },
    { nombre: 'Cuidado Corporal', ruta: 'cuidado-corporal' },
   
  ];

  categoriasFiltradas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const categoria = params.get('categoria'); // viene "maquillaje" o "cuidado-facial"

    if (categoria) {

      // Mostrar bonito en la vista
      this.nombreCategoria = categoria.replace(/-/g, ' ');
      this.nombreCategoria =
        this.nombreCategoria.charAt(0).toUpperCase() +
        this.nombreCategoria.slice(1);

      // 👉 Convertir guiones a espacios para enviarlo EXACTO como en la BD
      const categoriaParaBackend = categoria
        .replace(/-/g, ' ')
        .replace(/\b\w/g, letra => letra.toUpperCase()); // capitaliza cada palabra

      console.log("Enviando al backend:", categoriaParaBackend);

      this.categoriasFiltradas = this.categorias.filter(
        c => c.ruta !== categoria
      );

      // 👉 Llamar con el formato correcto
      this.cargarProductosPorCategoria(categoriaParaBackend);
    }
  });
}




  irACategoria(categoriaRuta: string) {
    this.router.navigate(['/categoria', categoriaRuta]);
  }

cargarProductosPorCategoria(categoria: string): void {
  this.productService.getCategoria(categoria).subscribe({
    next: productos => {
      // Si tu endpoint devuelve un array de productos
      this.productosOriginales = Array.isArray(productos) ? productos : [productos];
      this.productos = this.productosOriginales.map(p => ({
        ...p,
        mostrarMensaje: false,
        stock: p.stock // aseguramos que stock esté disponible
      }));
    },
    error: err => console.error('❌ Error al cargar productos:', err)
  });
}

agregarACesta(producto: ProductoConMensaje): void {
  const cesta: any[] = JSON.parse(localStorage.getItem('cesta') || '[]');
  const index = cesta.findIndex(p => p.id_producto === producto.id_producto);

  // Cantidad actual en el carrito
  const cantidadActual = index > -1 ? cesta[index].cantidad : 0;

  // Validación de stock
  if (producto.stock !== undefined && cantidadActual >= producto.stock) {
    alert(`No puedes agregar más unidades. Stock disponible: ${producto.stock}`);
    return;
  }

  if (index > -1) {
    // Incrementa cantidad solo si no supera stock
    cesta[index].cantidad = cantidadActual + 1;
  } else {
    // Agrega el producto con cantidad inicial 1
    cesta.push({
      id_producto: producto.id_producto,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  localStorage.setItem('cesta', JSON.stringify(cesta));

  // Mensaje visual en la tarjeta
  producto.mostrarMensaje = true;
  setTimeout(() => producto.mostrarMensaje = false, 2500);
}


  abrirDetalles(producto: ProductoConMensaje): void {
    this.productoSeleccionado = producto;
  }

  cerrarDetalles(): void {
    this.productoSeleccionado = null;
  }

  dividirCaracteristicas(texto: string | undefined): string[] {
    return texto ? texto.split(',').map(c => c.trim()) : [];
  }
}
