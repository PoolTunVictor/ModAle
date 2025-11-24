import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  passwordVisible: boolean = false;
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  async login() {
    if (!this.email || !this.password) {
      alert("Debes ingresar correo y contraseña");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.detail || "Credenciales incorrectas");
        return;
      }

      // ✔️ Guardar datos del usuario (si quieres)
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✔️ Redirigir al catalogo
      this.router.navigate(['/product-catalog']);

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("No se pudo conectar con el servidor");
    }
  }

  loginWithGoogle() {
    console.log('Login with Google clicked');
  }

  loginWithGitHub() {
    console.log('Login with GitHub clicked');
  }

  loginWithFacebook() {
    console.log('Login with Facebook clicked');
  }
}