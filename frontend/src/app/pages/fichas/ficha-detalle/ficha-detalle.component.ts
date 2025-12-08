import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PedidoService } from '../../../core/service/pedido/pedido.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-ficha-detalle',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [PedidoService],
  templateUrl: './ficha-detalle.component.html',
  styleUrls: ['./ficha-detalle.component.css']
})
export class FichaDetalleComponent implements OnInit {

  ficha: any = null;      // objeto completo del pedido
  detalles: any[] = [];   // lista de detalles
  cargando: boolean = true;
  public idPedido!: number;

  constructor(
    protected route: ActivatedRoute,
    private pedidoService: PedidoService, 
  ) {}

  

ngOnInit(): void {
  this.idPedido = Number(this.route.snapshot.paramMap.get('id'));

  if (!this.idPedido) {
    console.error("ID inválido en la URL");
    return;
  }

  this.cargarPedido(this.idPedido);
  this.cargarDetalles(this.idPedido);
}



  // ========================
  //    Cargar Pedido
  // ========================
  cargarPedido(id: number) {
    this.pedidoService.getPedidoPorId(id).subscribe({
      next: (pedido) => {
        this.ficha = pedido;
        this.cargando = false;
      },
      error: (err) => {
        console.error("Error al cargar pedido", err);
        this.cargando = false;
      }
    });
  }

  // ========================
  //    Cargar Detalles
  // ========================
// dentro de FichaDetalleComponent
cargarDetalles(id: number) {
  this.pedidoService.getDetallesPedido(id).subscribe({
    next: (resp: any[]) => {
      this.detalles = resp || [];

      // si hay detalles, calcular total
      this.ficha = this.ficha || {};
      this.ficha.total = this.calcularTotalFromDetalles();

      this.cargando = false;
      console.log("DETALLES RECIBIDOS:", resp);
    },
    error: (err: any) => {
      console.error("Error al cargar detalles", err);
      this.cargando = false;
    }
  });
}


// helper si necesitas calcular total desde detalles (fallback)
calcularTotalFromDetalles(): number {
  return (this.detalles || []).reduce((acc, d) => acc + (d.cantidad * (d.precio_unitario || 0)), 0);
}

  calcularTotal(): number {
    if (!this.detalles) return 0;

    return this.detalles.reduce(
      (acc, d) => acc + (d.cantidad * d.precio_unitario),
      0
    );
  }

  volver() {
    window.history.back();
  }

  imprimir() {
    window.print();
  }
}
