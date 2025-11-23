import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cantidadCesta: number = 0;
  private subscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Inicializamos la cantidad al cargar
    this.actualizarCantidadCesta();

    // Suscribimos a cambios en el localStorage usando un interval
    this.subscription = interval(500).subscribe(() => {
      this.actualizarCantidadCesta();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    const confirmar = confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmar) {
      localStorage.removeItem('token');
      localStorage.removeItem('cesta'); // Opcional, si quieres limpiar carrito al cerrar sesión
      this.router.navigate(['/login']);
    }
  }

  actualizarCantidadCesta(): void {
    const cesta: any[] = JSON.parse(localStorage.getItem('cesta') || '[]');
    this.cantidadCesta = cesta.reduce((acc, item) => acc + (item.stock || 0), 0);
  }
}
