import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ReportesComponent implements OnInit {

  fechaReporte: Date = new Date();

  resumenSemanal = {
    totalVentas: 6795,
    pedidosTotales: 30,
    productoMasVendido: 'Crema Hidratante Rosé',
    diaMasActivo: 'Lunes'
  };

  productosTop = [
    { nombre: 'Gloss Mágico de Sandía', categoria: 'Maquillaje', vendidos: 35, ingresos: 875 },
    { nombre: 'Pinzas para depilar', categoria: 'Accesorios', vendidos: 30, ingresos: 450 },
    { nombre: 'Pattern Eau de Parfum', categoria: 'Perfumes', vendidos: 7, ingresos: 525 },
    { nombre: 'Salvace For Men', categoria: 'Perfumes', vendidos: 10, ingresos: 750},
    { nombre: 'Boss Orange For Men', categoria: 'Perfumes', vendidos: 7, ingresos: 525},
    { nombre: 'Mangas protectoras para el sol', categoria: 'Prendas', vendidos: 20, ingresos: 400},
    { nombre: 'Serum 24k', categoria: 'Cuidado Facial', vendidos: 20, ingresos: 1000 },
    { nombre: 'Perfume Noir Forét', categoria: 'Perfumes', vendidos: 10, ingresos: 750 },
    { nombre: 'Pinzas de flor', categoria: 'Accesorios', vendidos: 25, ingresos: 500},
    { nombre: 'CHANEL', categoria: 'Perfumes', vendidos: 12, ingresos: 1020 }
  ];

  productosLow = [
    { nombre: 'Gloss Sparkling', categoria: 'Labios', vendidos: 3, stock: 20 },
    { nombre: 'Tónico de Lavanda', categoria: 'Cuidado Facial', vendidos: 2, stock: 14 },
    { nombre: 'Base Compacta', categoria: 'Maquillaje', vendidos: 1, stock: 25 }
  ];

  constructor() {}

  ngOnInit(): void {}

  imprimirReporte() {
    window.print();
  }
}
