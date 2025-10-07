import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  loginWithGoogle() {
    console.log('Login with Google clicked');
    // Aquí iría tu lógica de OAuth
  }

  loginWithGitHub() {
    console.log('Login with GitHub clicked');
  }

  loginWithFacebook() {
    console.log('Login with Facebook clicked');
  }
}
