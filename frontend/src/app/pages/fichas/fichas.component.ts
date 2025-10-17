import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fichas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fichas.component.html',
  styleUrls: ['./fichas.component.css']
})
export class FichasComponent {
  constructor(private router: Router) {}

  fichas = [
    { nombre: 'Sophia Clark', fecha: '2024-01-15', estado: 'Nuevo', ubicacion: 'Calkiní' },
    { nombre: 'Liam Walker', fecha: '2024-01-16', estado: 'En proceso', ubicacion: 'Dzibtaché' },
    { nombre: 'Olivia Carter', fecha: '2024-01-17', estado: 'Nuevo', ubicacion: 'Bacabchén' },
    { nombre: 'Noah Evans', fecha: '2024-01-18', estado: 'Completado', ubicacion: 'Calkiní' },
    { nombre: 'Ava Bennett', fecha: '2024-01-19', estado: 'Nuevo', ubicacion: 'Calkiní' },
    { nombre: 'Ethan Reed', fecha: '2024-01-20', estado: 'En proceso', ubicacion: 'Dzibtaché' },
    { nombre: 'Isabella Hayes', fecha: '2024-01-21', estado: 'Nuevo', ubicacion: 'Bacabchén' },
    { nombre: 'Jackson Powell', fecha: '2024-01-22', estado: 'Completado', ubicacion: 'Calkiní' },
  ];

  verDetalle() {
    this.router.navigate(['/fichas-detalle']);
  }
}
