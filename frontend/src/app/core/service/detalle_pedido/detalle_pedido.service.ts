import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  private apiUrl = 'https://modale-production.up.railway.app/detalles_pedido/';
  // 👆 Asegúrate de poner "/" al final

  constructor(private http: HttpClient) {}

  crearDetalle(detalle: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, detalle);
  }

  getDetallesPorPedido(id_pedido: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}pedido/${id_pedido}`);
  }
}

