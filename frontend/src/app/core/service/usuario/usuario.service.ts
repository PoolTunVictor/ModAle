import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

private apiUrl = 'https://modale-production.up.railway.app/api/usuarios';

  constructor(private http: HttpClient) {}

getUsuarios(): Observable<Usuario[]> {
  const token = localStorage.getItem('token');
  return this.http.get<Usuario[]>(this.apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
}