import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  // URL del endpoint en tu backend
  private apiUrl = 'http://localhost:8000/api/pedidos/';

  constructor(private http: HttpClient) {}

  // Obtener todos los pedidos
  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear un pedido (si lo necesitas)
  crearPedido(pedido: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pedido);
  }
}
