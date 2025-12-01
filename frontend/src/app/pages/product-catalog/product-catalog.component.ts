import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/service/product/product.service';
import { Producto } from '../../core/models/producto';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit, OnDestroy {

  nuevos: Producto[] = [];
  nuevosRotados: Producto[] = [];

  populares: Producto[] = [];
  popularesRotados: Producto[] = [];

  private rotacionIndexNuevos = 0;
  private rotacionIndexPopulares = 0;

  private intervaloNuevos: any = null;
  private intervaloPopulares: any = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.get().subscribe({
      next: (productos: Producto[]) => {

        
        this.nuevos = productos.filter(p => p.nuevo === true);

        
        this.populares = productos.filter(p => p.activo === true);

        
        this.nuevosRotados = this.nuevos.slice(0, 5);
        this.popularesRotados = this.populares.slice(0, 5);

        
        if (this.nuevos.length > 5) {
          setTimeout(() => this.iniciarRotacionNuevos(), 500);
        }

        if (this.populares.length > 5) {
          setTimeout(() => this.iniciarRotacionPopulares(), 500);
        }
      },
      error: (err) => console.error('Error cargando productos:', err)
    });
  }

  ngOnDestroy(): void {
    this.detenerRotaciones();
  }

  iniciarRotacionNuevos() {
    this.detenerRotacionNuevos();
    this.intervaloNuevos = setInterval(() => {
      this.rotacionIndexNuevos = (this.rotacionIndexNuevos + 5) % this.nuevos.length;
      this.nuevosRotados = this.obtenerBloque(this.nuevos, this.rotacionIndexNuevos);
    }, 4000);
  }

  detenerRotacionNuevos() {
    if (this.intervaloNuevos) clearInterval(this.intervaloNuevos);
  }

 
  iniciarRotacionPopulares() {
    this.detenerRotacionPopulares();
    this.intervaloPopulares = setInterval(() => {
      this.rotacionIndexPopulares = (this.rotacionIndexPopulares + 5) % this.populares.length;
      this.popularesRotados = this.obtenerBloque(this.populares, this.rotacionIndexPopulares);
    }, 4000);
  }

  detenerRotacionPopulares() {
    if (this.intervaloPopulares) clearInterval(this.intervaloPopulares);
  }

 
  obtenerBloque(lista: Producto[], inicio: number): Producto[] {
    const fin = inicio + 5;
    if (fin <= lista.length) return lista.slice(inicio, fin);

    const parte1 = lista.slice(inicio);
    const parte2 = lista.slice(0, 5 - parte1.length);
    return [...parte1, ...parte2];
  }

  detenerRotaciones() {
    this.detenerRotacionNuevos();
    this.detenerRotacionPopulares();
  }


}
