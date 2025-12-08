import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

private apiUrl = 'https://modale-production.up.railway.app/api/auth/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}
