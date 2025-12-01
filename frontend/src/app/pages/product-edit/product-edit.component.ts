import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/service/product/product.service';
import { Producto } from '../../core/models/producto';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  producto: Producto = {} as Producto;
  cargando = false;
  guardando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.cargarProducto(id);
  }

  // ✅ Cargar datos desde el backend
  cargarProducto(id: string): void {
    this.cargando = true;
    this.productService.getId(id).subscribe({
      next: (data) => {
        this.producto = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar producto:', err);
        this.cargando = false;
        alert('Error al cargar el producto');
      }
    });
  }

  // ✅ Guardar cambios y regresar a la misma categoría usando Filtros guardados
  guardarCambios(event?: Event): void {
  event?.preventDefault();

  if (this.producto.id_producto === null || this.producto.id_producto === undefined) {
    alert('Error: el ID del producto no está definido.');
    return;
  }

  const categoriaActual = localStorage.getItem("categoriaSeleccionada") || "";
  const nombreActual = localStorage.getItem("nombreBusqueda") || "";

  this.guardando = true;

  this.productService.put(this.producto.id_producto.toString(), this.producto).subscribe({
    next: () => {
      alert('✅ Producto actualizado correctamente');
      this.guardando = false;

      // 👉 Regresar a products-table manteniendo filtros
      this.router.navigate(['/admin/products-table'], {
        queryParams: {
          categoria: categoriaActual,
          nombre: nombreActual
        }
      });
    },
    error: (err) => {
      console.error('❌ Error al actualizar producto:', err);
      this.guardando = false;
      alert('Error al actualizar el producto');
    }
  });
}


  // 📷 Vista previa de la imagen seleccionada
  previewUrl: string | ArrayBuffer | null = null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.previewUrl = reader.result;
      this.producto.imagen = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  cancelar(): void {
    // 🔥 También regresar manteniendo filtros
    const categoria = localStorage.getItem("categoriaSeleccionada");
    const nombre = localStorage.getItem("nombreBusqueda");

    this.router.navigate(['/admin/products-table'], {
      queryParams: {
        categoria: categoria || '',
        nombre: nombre || ''
      }
    });
  }

  categorias: string[] = [
    'Maquillaje',
    'Cuidado Facial',
    'Perfumes',
    'Accesorios',
    'Prendas',
    'Cuidado Corporal'
  ];

}
