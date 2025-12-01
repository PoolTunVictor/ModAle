import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface Localidad {
  id_localidad: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class LocalidadService {
  private url = 'http://localhost:8000/localidades'; // Cambia a tu endpoint real

  constructor(private http: HttpClient) {}

  getLocalidades(): Observable<Localidad[]> {
    return this.http.get<Localidad[]>(this.url).pipe(
      catchError((error) => {
        console.error('Error cargando localidades:', error);
        return of([]); // Devuelve array vacío si hay error
      })
    );
  }
}
