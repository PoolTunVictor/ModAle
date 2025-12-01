import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../core/service/product/product.service';
import { Producto } from '../../core/models/producto';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  cargando: boolean = false;

  categorias: string[] = [
    "Maquillaje",
    "Cuidado Facial",
    "Perfumes",
    "Accesorios",
    "Prendas",
    "Cuidado Corporal"
  ];

  categoriaSeleccionada: string = "";
  nombreBusqueda: string = "";

  constructor(private productService: ProductService, private router: Router,private route: ActivatedRoute) {}

 ngOnInit(): void {

  // 👉 Leer filtros de la URL al regresar
  this.route.queryParams.subscribe(params => {
    this.categoriaSeleccionada = params['categoria'] || "";
    this.nombreBusqueda = params['nombre'] || "";
  });

  this.obtenerProductos();
}


obtenerProductos(): void {
  this.cargando = true;

  this.productService.get().subscribe({
    next: (data) => {
      this.productos = data;

      // 👉 Mantener la categoría seleccionada y el nombre buscado
      this.filtrarProductos();

      this.cargando = false;
    },
    error: (err) => {
      console.error('❌ Error al obtener los productos:', err);
      this.cargando = false;
    }
  });
}


  filtrarProductos(): void {
    this.productosFiltrados = this.productos.filter(p => {
      const coincideCategoria = this.categoriaSeleccionada
        ? p.categoria === this.categoriaSeleccionada
        : true;

      const coincideNombre = this.nombreBusqueda
        ? p.nombre.toLowerCase().includes(this.nombreBusqueda.toLowerCase())
        : true;

      return coincideCategoria && coincideNombre;
    });
  }

  eliminarProducto(id_producto?: number): void {
  if (!id_producto) return;

  if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

  // 👉 Guardar la categoría antes de recargar
  localStorage.setItem("categoriaSeleccionada", this.categoriaSeleccionada);
  localStorage.setItem("nombreBusqueda", this.nombreBusqueda);

  this.productService.delete(id_producto.toString()).subscribe({
    next: () => {
      alert('🗑️ Producto eliminado correctamente');
      this.obtenerProductos(); // Esto ya no pierde filtros
    },
    error: (err) => {
      console.error(err);
      alert('❌ Error al eliminar el producto');
    }
  });
}


  editarProducto(producto: Producto): void {
  if (!producto.id_producto) return;

  // 👉 Guardar la categoría actual
  localStorage.setItem("categoriaSeleccionada", this.categoriaSeleccionada);
  localStorage.setItem("nombreBusqueda", this.nombreBusqueda);

  this.router.navigate(['/admin/editar-producto', producto.id_producto]);
}


}
