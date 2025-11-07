import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'
import { ProductService } from '../../core/service/product/product.service';
import { Producto } from '../../core/models/producto';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  productos: Producto[] = [];
  cargando: boolean = false;

  constructor(private productService: ProductService, private router:Router) {
    
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  // ✅ Carga todos los productos desde el backend
  obtenerProductos(): void {
    this.cargando = true;
    this.productService.get().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al obtener los productos:', err);
        this.cargando = false;
      }
    });
  }

  // ✅ Elimina un producto por su ID
  eliminarProducto(id_producto?: number): void {
   if (id_producto === undefined || id_producto === null) return;

    const confirmar = confirm('¿Seguro que deseas eliminar este producto?');
    if (!confirmar) return;

    this.productService.delete(id_producto.toString()).subscribe({
      next: () => {
        alert('🗑️ Producto eliminado correctamente');
        this.obtenerProductos();
      },
      error: (err) => {
        console.error('❌ Error al eliminar el producto:', err);
        alert('Error al eliminar el producto');
      }
    });
  }

  // ✅ (Opcional) Redirigir al formulario de edición
 editarProducto(producto: Producto): void {
 if (producto.id_producto === undefined || producto.id_producto === null) return;
  this.router.navigate(['/admin/editar-producto', producto.id_producto]);
}
}