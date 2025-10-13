import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../core/service/productos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categori-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categori-page.component.html',
  styleUrls: ['./categori-page.component.css']
})
export class CategoriPageComponent implements OnInit {
  nombreCategoria: string = '';
  productos: any[] = [];
  productosCompletos: any[] = [];
  precioMax: number = 15; 

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.nombreCategoria = this.route.snapshot.paramMap.get('nombre') || '';
    this.cargarProductos(this.nombreCategoria);
  }

  cargarProductos(nombre: string) {
    this.productosService.getProductosPorCategoria(nombre)
      .subscribe(productos => {
        this.productosCompletos = productos || [];
        this.productos = [...this.productosCompletos];
      });
  }

  agregarACesta(producto: any) {
    console.log('Añadido al carrito:', producto.nombre);
  }

  regresarHome() {
    this.router.navigate(['/home-page']);
  }

  // 🔹 Filtrar por precio máximo
   filtrarPorPrecio(event: any) {
    this.precioMax = +event.target.value; // convertir a número
    if (this.productosCompletos && this.productosCompletos.length > 0) {
      this.productos = this.productosCompletos.filter(p => p.precio <= this.precioMax);
    } else {
      this.productos = [];
    }
  }
}
