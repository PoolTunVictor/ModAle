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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  agregarProducto(): void {
 
    const productoParaEnviar = {
      ...this.producto,
      precio: Number(this.producto.precio),
      stock: Number(this.producto.stock),
      activo: Boolean(this.producto.activo),
      nuevo: Boolean(this.producto.nuevo),
      oferta: Boolean(this.producto.oferta)
    };

    this.productService.post(productoParaEnviar).subscribe({
      next: () => {
        alert('Producto agregado con éxito');
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert('Error al agregar el producto');
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
