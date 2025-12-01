import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private apiUrl = 'http://localhost:8000/direcciones'; // Endpoint de tu backend

  constructor(private http: HttpClient) {}

  crearDireccion(direccion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, direccion);
  }

  getDireccionesPorUsuario(id_usuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuario/${id_usuario}`);
  }
}
