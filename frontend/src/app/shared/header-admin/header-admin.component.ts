// header-admin.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {

  constructor(private router: Router) {}

  
  logout() {
    const confirmar = confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmar) {
      localStorage.removeItem('token');
      localStorage.removeItem('cesta'); // Opcional, si quieres limpiar carrito al cerrar sesión
      this.router.navigate(['/login']);
    }
  }
}

