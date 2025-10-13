@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'admin', password: '123456' },
    { username: 'editor', password: '123456' },
    { username: 'basic', password: '123456' }
  ];

  private loggedIn = true; // <-- auto-login para pruebas

  constructor() {}

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    this.loggedIn = !!user;
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
