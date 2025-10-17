import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  imports: [CommonModule],
  styleUrls: ['./fichas.component.css']
})
export class FichasComponent {
  selectedLocation = 'all';

  fichas = [
    { name: 'Sophia Clark', date: '2024-01-15', status: 'Nuevo', location: 'Calkiní' },
    { name: 'Liam Walker', date: '2024-01-16', status: 'En proceso', location: 'Dzibalché' },
     { name: 'Liam Walker', date: '2024-01-16', status: 'En proceso', location: 'Becal' },
    { name: 'Olivia Carter', date: '2024-01-17', status: 'Nuevo', location: 'Bacabchén' },
    { name: 'Noah Evans', date: '2024-01-18', status: 'Completado', location: 'Calkiní' },
    { name: 'Ava Bennett', date: '2024-01-19', status: 'Nuevo', location: 'Calkiní' },
    { name: 'Ethan Reed', date: '2024-01-20', status: 'En proceso', location: 'Dzibalché' },
    { name: 'Isabella Hayes', date: '2024-01-21', status: 'Nuevo', location: 'Bacabchén' },
    { name: 'Jackson Powell', date: '2024-01-22', status: 'Completado', location: 'Calkiní' }
  ];

  fichasFiltradas = [...this.fichas];

  constructor(private router: Router) {}

  filtrarPorUbicacion(location: string) {
    this.selectedLocation = location;
    if (location === 'all') {
      this.fichasFiltradas = [...this.fichas];
    } else {
      this.fichasFiltradas = this.fichas.filter(f => f.location === location);
    }
  }

  verDetalle(ficha: any) {
    this.router.navigate(['/fichas/:id'], { queryParams: { name: ficha.name } });
  }
}
