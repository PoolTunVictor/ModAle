import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api/auth'; // Ruta base del backend

  constructor(private http: HttpClient) {}

  // Login de usuario
  login(loginData: { email: string; password: string }): Observable<any> {
    const payload = { email_or_username: loginData.email, password: loginData.password };

    return this.http.post(`${this.apiUrl}/login`, payload).pipe(
      tap((response: any) => {
        if (response.user) localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  // Registrar usuario
  register(registerData: { nombre: string; telefono: string; email: string; username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData);
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('user');
  }

  // Verificar si está logueado
  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  // Obtener usuario actual
  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  // Obtener rol del usuario
  getRole(): string {
    return this.getUser()?.rol || '';
  }
}
