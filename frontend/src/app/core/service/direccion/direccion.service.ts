import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private apiUrl = 'http://localhost:8000/api/direcciones/'; // Endpoint de tu backend

  constructor(private http: HttpClient) {}

  // Crear dirección usando colonia, referencia y id_localidad
  crearDireccion(direccion: { colonia: string; referencia?: string; id_localidad: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, direccion);
  }

  // Obtener todas las direcciones
  getDirecciones(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Si quieres obtener direcciones por localidad (opcional)
  getDireccionesPorLocalidad(id_localidad: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/localidad/${id_localidad}`);
  }
}
