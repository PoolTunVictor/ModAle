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

  // ✅ Guardar los cambios
  guardarCambios(): void {
    if (!this.producto.id_producto) return;

    this.guardando = true;
    this.productService.put(this.producto.id_producto.toString(), this.producto).subscribe({
      next: () => {
        alert('✅ Producto actualizado correctamente');
        this.guardando = false;
        this.router.navigate(['/admin/products-table']);
      },
      error: (err) => {
        console.error('❌ Error al actualizar producto:', err);
        this.guardando = false;
        alert('Error al actualizar el producto');
      }
    });
  }
  
  previewUrl: string | ArrayBuffer | null = null;
  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    this.previewUrl = reader.result;
    // opcionalmente guardamos la imagen en producto.imagen si quieres enviarla como base64
    this.producto.imagen = reader.result as string;
  };

  reader.readAsDataURL(file);
}

  cancelar(): void {
    this.router.navigate(['/admin/products-table']);
  }

  categorias: string[] = [
  'nuevo',
  'cuidado facial',
  'accesorios',
  'perfumes',
  'maquillaje',
  'prendas',
  'cuidado corporal',
  'ofertas'
];
}
