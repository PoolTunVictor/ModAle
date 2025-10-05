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
      'cuidado-facial': [{ nombre: 'JA’BON Night Cream', precio: 350 }],
      'accesorios': [{ nombre: 'Secadora Pro', precio: 450 }],
      'perfumes': [{ nombre: 'HOMME Eau de Parfum', precio: 520 }],
      'maquillaje':[{ nombre: 'Iluminadores', precio: 40 }],
      'prendas':[{ nombre: 'Calcetines', precio: 30 }],
      'cuidado-corporal':[{ nombre: 'Bloqueador solar', precio: 30 }],
      'ofertas':[{ nombre: 'Juguete sepsual', precio: 80 }]
    };

    this.productos = todosLosProductos[nombre] || [];
  }
}
