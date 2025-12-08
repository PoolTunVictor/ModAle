import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidoService {

  private apiUrl = 'https://modale-production.up.railway.app/api/pedidos';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPedidoPorId(id: number) {
    return this.http.get(`${this.apiUrl}/detalle/${id}`);
  }

  crearPedido(pedido: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pedido, this.getHeaders());
  }

  getPedido(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getPedidosDeUsuario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user`, this.getHeaders());
  }

  getDetallesPedido(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/detalles`);
  }
}
