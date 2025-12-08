import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../core/service/pedido/pedido.service';
import { LocalidadService, Localidad } from '../../core/service/localidad/localidad.service';

@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./fichas.component.css']
})
export class FichasComponent implements OnInit {

  fichas: any[] = [];
  fichasFiltradas: any[] = [];

  localidades: Localidad[] = [];   // si cargas dinámicamente
  filtroLocalidad: string = 'all';
  filtroEstado: string = 'all';
  filtroFecha: string = ''; // YYYY-MM-DD

  constructor(
    private router: Router,
    private pedidoService: PedidoService,
    private localidadService: LocalidadService
  ) {}

  ngOnInit(): void {
    this.cargarLocalidades(); // opcional pero recomendado
    this.cargarPedidos();
  }

  cargarLocalidades(): void {
    this.localidadService.getLocalidades().subscribe({
      next: (data: Localidad[]) => {
        this.localidades = data || [];
      },
      error: (err) => console.error('Error al cargar localidades', err)
    });
  }

  cargarPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: (data: any[]) => {
        console.log('RAW PEDIDOS FROM API:', data);

        this.fichas = data.map(pedido => {
          // --- EXTRAE FECHA EN YYYY-MM-DD para comparar con input date
          let fechaISO = '';
          if (pedido.fecha) {
            // si viene en ISO con T, cortar; si viene como Date, convertir
            fechaISO = typeof pedido.fecha === 'string'
              ? pedido.fecha.split('T')[0]
              : new Date(pedido.fecha).toISOString().split('T')[0];
          }

          // --- EXTRAER LOCALIDAD robusto: soporta varias formas que el backend pueda devolver
          let location = 'Sin localidad';

          // caso 1: pedido.direccion.localidad es objeto { nombre: '...' }
          if (pedido?.direccion?.localidad?.nombre) {
            location = pedido.direccion.localidad.nombre;
          }
          // caso 2: pedido.direccion.localidad es string
          else if (pedido?.direccion?.localidad && typeof pedido.direccion.localidad === 'string') {
            location = pedido.direccion.localidad;
          }
          // caso 3: tal vez el backend devuelve pedido.localidad directamente
          else if (pedido?.localidad && typeof pedido.localidad === 'string') {
            location = pedido.localidad;
          }
          // caso 4: pedido.direccion.colonia u otro fallback
          else if (pedido?.direccion?.colonia) {
            location = pedido.direccion.colonia;
          }

          return {
            id: pedido.id_pedido,
            name: pedido.usuario?.nombre || 'Sin usuario',
            date: fechaISO,
            status: pedido.estado || 'Sin estado',
            location
          };
        });

        this.fichasFiltradas = [...this.fichas];
      },
      error: (err: any) => {
        console.error('Error al cargar pedidos', err);
      }
    });
  }

  aplicarFiltros(): void {
    const fLoc = this.filtroLocalidad;
    const fEst = this.filtroEstado;
    const fFecha = this.filtroFecha;

    this.fichasFiltradas = this.fichas.filter(f => {
      const coincideLocalidad = fLoc === 'all' || f.location === fLoc;
      const coincideEstado = fEst === 'all' || f.status === fEst;
      const coincideFecha = !fFecha || f.date === fFecha;
      return coincideLocalidad && coincideEstado && coincideFecha;
    });
  }

  verDetalle(ficha: any): void {
    this.router.navigate(['/admin/ficha-detalle', ficha.id]);
  }
}
