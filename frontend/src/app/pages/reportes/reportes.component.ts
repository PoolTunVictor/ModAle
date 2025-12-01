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
    totalVentas: 15750.80,
    pedidosTotales: 51,
    productoMasVendido: 'Crema Hidratante Rosé',
    diaMasActivo: 'Viernes'
  };

  productosTop = [
    { nombre: 'Crema Hidratante Rosé', categoria: 'Cuidado Facial', vendidos: 150, ingresos: 10800 },
    { nombre: 'Labial Matte Nude', categoria: 'Maquillaje', vendidos: 95, ingresos: 3500 },
    { nombre: 'Sombras Glow', categoria: 'Ojos', vendidos: 75, ingresos: 4200 },
    { nombre: 'Serum Vitamina C', categoria: 'Cuidado Facial', vendidos: 60, ingresos: 5400 },
    { nombre: 'Delineador Negro', categoria: 'Ojos', vendidos: 55, ingresos: 1800 }
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
