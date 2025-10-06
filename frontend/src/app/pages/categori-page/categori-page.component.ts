import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.nombreCategoria = this.route.snapshot.paramMap.get('nombre') || '';
    this.cargarProductos(this.nombreCategoria);
  }

  cargarProductos(nombre: string) {
    const todosLosProductos: { [key: string]: { nombre: string; precio: number }[] } = {
      'nuevo': [{ nombre: 'Crema AMICA', precio: 120 }, { nombre: 'Serum Glow', precio: 200 }],
      'cuidado-facial': [{ nombre: 'JABON Night Cream', precio: 350 }, { nombre: 'Serúm de rosas', precio: 50 }, { nombre: 'Serúm 24k', precio: 50 }],
      'accesorios': [{ nombre: 'Secadora Pro', precio: 450 }, { nombre: 'Scrunchies', precio: 18}],
      'perfumes': [{ nombre: 'HOMME Eau de Parfum', precio: 520 }, { nombre: 'BOOS ORANGE', precio: 75 }, { nombre: 'PATTERN', precio: 75 }],
      'maquillaje':[{ nombre: 'Iluminadores', precio: 40 }, { nombre: 'Base liquida de maquillaje', precio: 30 },
      { nombre: 'Corrector líquido', precio: 20 }, { nombre: 'Labiales matte', precio: 30 }, { nombre: 'Bálsamo tipo Dior', precio: 40 }, 
      { nombre: 'Lip Gloss', precio: 30 }, { nombre: 'Labial matte tipo Maybelline', precio: 45 }, { nombre: 'Delineador líquido', precio: 35 }, 
      { nombre: 'Blush en polvo', precio: 25 }, { nombre: 'Jabón/cera para la cejas', precio: 20 }, { nombre: 'Gel para cejas y pestañas', precio: 30 }, 
      { nombre: 'Blush en barra', precio: 45 }, { nombre: 'Fijador de maquillaje Fit me', precio: 35 }],
      'prendas':[{ nombre: 'Calcetines', precio: 30 }, { nombre: 'Shorts dama', precio: 65 }],
      'cuidado-corporal':[{ nombre: 'Bloqueador solar', precio: 30 }, { nombre: 'Exfoliante "Body Scrub"', precio: 50 }, { nombre: 'Toallas húmedas antibacterianas', precio: 55 }], 
      'ofertas':[{ nombre: 'Kit de maquillaje "ULTRAMO"', precio: 100 }, { nombre: 'Par de lápices', precio: 12 }]
    };

    this.productos = todosLosProductos[nombre] || [];
  }
}
