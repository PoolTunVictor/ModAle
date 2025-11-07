import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ficha-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ficha-detalle.component.html',
  styleUrls: ['./ficha-detalle.component.css']
})
export class FichaDetalleComponent implements OnInit {
  fichaId!: string;
  ficha: any;

  fichas = [
    { id: 1, nombre: 'Ficha 1', cliente: 'Sophia Rodríguez', email: 'sophia.rodriguez@email.com', location: 'Calkiní', productos: [
      { producto: 'Organic Apples', cantidad: 2, precio: 2.50 },
      { producto: 'Fresh Milk', cantidad: 1, precio: 3.00 },
      { producto: 'Whole Wheat Bread', cantidad: 1, precio: 4.00 },
    ]},
    { id: 2, nombre: 'Ficha 2', cliente: 'Luis Herrera', email: 'luis.herrera@email.com', location: 'Bacabchén', productos: [
      { producto: 'Bananas', cantidad: 3, precio: 1.50 },
      { producto: 'Yogurt', cantidad: 2, precio: 2.00 },
    ]},
    { id: 3, nombre: 'Ficha 3', cliente: 'Ana Torres', email: 'ana.torres@email.com', location: 'Dzibalchén', productos: [
      { producto: 'Oranges', cantidad: 4, precio: 1.20 },
      { producto: 'Honey', cantidad: 1, precio: 5.00 },
    ]},
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fichaId = this.route.snapshot.paramMap.get('id')!;
    this.ficha = this.fichas.find(f => f.id === parseInt(this.fichaId));
  }

  calcularTotal() {
    return this.ficha.productos.reduce((acc: number, p: any) => acc + p.cantidad * p.precio, 0);
  }

  volver() {
  window.history.back();
}
imprimir() {
  window.print();
}


}
