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

  users = [
    { username: 'admin', password: '123456' },
    { username: 'editor', password: '123456' },
    { username: 'basic', password: '123456' }
  ];

  constructor(private router: Router) {}

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  login() {
    const user = this.users.find(
      u => u.username === this.email && u.password === this.password
    );

    if (user) {
      this.router.navigate(['/product-catalog']); // Página inicial después de login
    } else {
      alert('Usuario o contraseña incorrectos');
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
