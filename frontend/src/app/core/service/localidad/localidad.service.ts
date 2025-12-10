import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface Localidad {
  id_localidad: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class LocalidadService {

  private url = 'https://modale-production.up.railway.app/localidades/';

  constructor(private http: HttpClient) {}

  getLocalidades(): Observable<Localidad[]> {
    const data = this.http.get<Localidad[]>(this.url);
    console.log(data);
    return data;/*.pipe(
      catchError((error) => {
        console.error('Error cargando localidades:', error);
        return of([]);
      })
    );*/
  }
}