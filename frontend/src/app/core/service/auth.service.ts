import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'AzielH', password: '2004' },
    { username: 'editor', password: '123456' },
    { username: 'basic', password: '123456' }
  ];

  constructor() {}

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('loggedIn', 'true'); // persiste la sesión
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
}
