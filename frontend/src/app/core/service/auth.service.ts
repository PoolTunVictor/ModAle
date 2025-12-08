import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://modale-production.up.railway.app/auth';

  constructor(private http: HttpClient) {}

  login(loginData: { email_or_username: string; password: string }): Observable<any> {
    const payload = {
      email_or_username: loginData.email_or_username,
      password: loginData.password
    };

    return this.http.post(`${this.apiUrl}/login`, payload).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  register(registerData: {
    nombre: string;
    telefono: string;
    email: string;
    username: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerData);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  getRole(): string {
    return this.getUser()?.rol || '';
  }

}
