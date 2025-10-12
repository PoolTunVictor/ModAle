import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // 🔹 Importa Router
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

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private router: Router // 🔹 Inyecta Router
  ) {}

  ngOnInit() {
    this.nombreCategoria = this.route.snapshot.paramMap.get('nombre') || '';
    this.cargarProductos(this.nombreCategoria);
  }

  cargarProductos(nombre: string) {
    this.productosService.getProductosPorCategoria(nombre)
      .subscribe(productos => this.productos = productos);
  }

  agregarACesta(producto: any) {
    console.log('Añadido al carrito:', producto.nombre);
  }

  // 🔹 Método para regresar al home
  regresarHome() {
    this.router.navigate(['/home-page']);
  }
}
