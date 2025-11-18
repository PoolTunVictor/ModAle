import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   // ✅ IMPORTANTE

@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  imports: [CommonModule, FormsModule],  // ✅ AGREGA ESTO
  styleUrls: ['./fichas.component.css']
})
export class FichasComponent {
  selectedLocation = 'all';

  filtroLocalidad: string = 'all';
  filtroEstado: string = 'all';
  filtroFecha: string = '';

  fichas = [
    { name: 'Sophia Clark', date: '2024-01-15', status: 'Nuevo', location: 'Calkiní' },
    { name: 'Liam Walker', date: '2024-01-16', status: 'En proceso', location: 'Dzibalché' },
    { name: 'Liam Walker', date: '2024-01-16', status: 'En proceso', location: 'Becal' },
    { name: 'Olivia Carter', date: '2024-01-17', status: 'Nuevo', location: 'Calkiní' },
    { name: 'Noah Evans', date: '2024-01-18', status: 'Completado', location: 'Calkiní' },
    { name: 'Ava Bennett', date: '2024-01-19', status: 'Nuevo', location: 'Calkiní' },
    { name: 'Ethan Reed', date: '2024-01-20', status: 'En proceso', location: 'Dzibalché' },
    { name: 'Isabella Hayes', date: '2024-01-21', status: 'Nuevo', location: 'Becal' },
    { name: 'Jackson Powell', date: '2024-01-22', status: 'Completado', location: 'Calkiní' }
  ];

  fichasFiltradas = [...this.fichas];

  constructor(private router: Router) {}

  filtrarPorUbicacion(location: string) {
    this.selectedLocation = location;
    this.filtroLocalidad = location;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.fichasFiltradas = this.fichas.filter(f => {

      const coincideLocalidad =
        this.filtroLocalidad === 'all' || f.location === this.filtroLocalidad;

      const coincideEstado =
        this.filtroEstado === 'all' || f.status === this.filtroEstado;

      const coincideFecha =
        this.filtroFecha === '' || f.date.startsWith(this.filtroFecha);

      return coincideLocalidad && coincideEstado && coincideFecha;
    });
  }

  fichaSeleccionada: any = null;

  verDetalle(ficha: any) {
    this.router.navigate(['/admin/ficha/ficha-detalle', ficha.id]);
  }
}
