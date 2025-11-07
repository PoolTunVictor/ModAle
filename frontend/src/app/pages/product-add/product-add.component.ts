import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../core/service/product/product.service';
import { Producto } from '../../core/models/producto';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  categorias: string[] = ['Maquillaje', 'Cuidado Facial', 'Perfumes', 'Accesorios', 'Prendas', 'Cuidado Corporal'];

  producto: Producto = {
    nombre: '',
    categoria: '',
    descripcion: '',
    caracteristicas: '',
    precio: 0,
    stock: 0,
    activo: true,
    nuevo: false,
    oferta: false,
    imagen: ''
  };

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private productService: ProductService) { }

  // ✅ Convierte el archivo a base64 y lo guarda en `producto.imagen`
  onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
      this.producto.imagen = reader.result as string; // Se guarda en base64
    };
    reader.readAsDataURL(file);
  }
}

  // ✅ Envía el producto con la imagen en base64
  agregarProducto(): void {
  // Si no se subió archivo, el usuario puede haber escrito una URL en el input de texto
  const productoParaEnviar = {
    ...this.producto,
    imagen: this.producto.imagen?.trim() || '', // asegura que no vaya "undefined"
    precio: Number(this.producto.precio),
    stock: Number(this.producto.stock),
    activo: Boolean(this.producto.activo),
    nuevo: Boolean(this.producto.nuevo),
    oferta: Boolean(this.producto.oferta)
  };

  this.productService.post(productoParaEnviar).subscribe({
    next: () => {
      alert('✅ Producto agregado con éxito');
      this.resetForm();
    },
    error: (err) => {
      console.error(err);
      alert('❌ Error al agregar el producto');
    }
  });
}

  resetForm(): void {
    this.producto = {
      id_producto: 0,
      nombre: '',
      categoria: '',
      descripcion: '',
      caracteristicas: '',
      precio: 0,
      stock: 0,
      activo: true,
      nuevo: false,
      oferta: false,
      imagen: ''
    };
    this.selectedFile = null;
    this.previewUrl = null;
  }
}
