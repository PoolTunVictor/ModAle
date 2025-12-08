import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../core/service/pedido/pedido.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-pedidos',
   imports: [CommonModule, DatePipe],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos: any[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidosUsuario();
  }

  cargarPedidosUsuario(): void {
    this.pedidoService.getPedidosDeUsuario().subscribe({
      next: (data) => {
        this.pedidos = data;
        console.log("Pedidos del usuario:", data);
      },
      error: (err) => {
        console.error("Error al traer pedidos del usuario:", err);
      }
    });
  }
}
