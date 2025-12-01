import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../core/service/pedido/pedido.service';

@Component({
  selector: 'app-fichas',
  templateUrl: './fichas.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./fichas.component.css']
})
export class FichasComponent implements OnInit {

  fichas: any[] = [];
  fichasFiltradas: any[] = [];

  filtroLocalidad: string = 'all';
  filtroEstado: string = 'all';
  filtroFecha: string = '';

  fichaSeleccionada: any = null;

  constructor(private router: Router, private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.getPedidos().subscribe({
      next: (data: any[]) => {
        this.fichas = data.map(pedido => ({
          id: pedido.id_pedido,
          name: pedido.usuario?.nombre || 'Sin usuario',
          date: pedido.fecha ? new Date(pedido.fecha).toLocaleDateString() : 'Sin fecha',
          status: pedido.estado || 'Sin estado',
          location: pedido.direccion?.lugar || 'Sin localidad'
        }));
        this.fichasFiltradas = [...this.fichas];
      },
      error: (err: any) => {
        console.error('Error al cargar pedidos', err);
      }
    });
  }

  aplicarFiltros(): void {
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

  verDetalle(ficha: any): void {
    this.router.navigate(['/admin/ficha/ficha-detalle', ficha.id]);
  }

}
