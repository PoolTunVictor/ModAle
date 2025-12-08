import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  // Alterna visibilidad de contraseña
  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  // Login normal
  login(): void {
  if (!this.email || !this.password) {
    alert("Debes ingresar usuario/email y contraseña");
    return;
  }

  const loginData = {
    email_or_username: this.email,  // ← debe coincidir con tu backend
    password: this.password
  };

  this.authService.login(loginData).subscribe({
    next: (response: any) => {

      // ============================
      // GUARDAR TOKEN
      // ============================
      localStorage.setItem('token', response.token);

      // Guardar usuario
      localStorage.setItem('user', JSON.stringify(response.user));

      console.log("TOKEN GUARDADO:", response.token);

      // Redirección según rol
      if (response.user.rol === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/product-catalog']);
      }
    },
    error: (error) => {
      alert(error.error?.detail || "Credenciales incorrectas");
    }
  });
}


  // Navegar a la pantalla de registro
  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  // Login social (placeholder)
  loginWithGoogle(): void {
    console.log("Login con Google");
  }

  loginWithFacebook(): void {
    console.log("Login con Facebook");
  }

  loginWithGitHub(): void {
    console.log("Login con GitHub");
  }
}
