import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private apiUrl = 'http://localhost:8000/api/direcciones/';

  constructor(private http: HttpClient) {}

  // ==========================
  // Obtener headers con token
  // ==========================
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // ==========================
  // Crear dirección
  // ==========================
  crearDireccion(direccion: {
    colonia: string;
    referencia?: string;
    id_localidad: number;
  }): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      direccion,
      this.getHeaders()
    );
  }

  // ==========================
  // Obtener todas las direcciones
  // ==========================
  getDirecciones(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.getHeaders());
  }

  // ==========================
  // Direcciones por localidad (opcional)
  // ==========================
  getDireccionesPorLocalidad(id_localidad: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}localidad/${id_localidad}`,
      this.getHeaders()
    );
  }
}
