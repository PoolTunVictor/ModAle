import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  nombre: string = '';
  telefono: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  passwordVisible: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }
goToLogin(): void {
  this.router.navigate(['/login']);
}

  register(): void {
    if (!this.nombre || !this.telefono || !this.email || !this.username || !this.password) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const registerData = {
      nombre: this.nombre,
      telefono: this.telefono,
      email: this.email,
      username: this.username,
      password: this.password // el backend debería hashear esta contraseña
    };

    this.authService.register(registerData).subscribe({
      next: (response: any) => {
        alert("Cuenta creada correctamente");
        this.router.navigate(['/login']); // redirige al login
      },
      error: (error) => {
        alert(error.error?.detail || "Error al registrar la cuenta");
      }
    });
  }
}
