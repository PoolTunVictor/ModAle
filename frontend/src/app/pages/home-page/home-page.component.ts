import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(private router: Router) {}

  categorias = [
    { nombre: 'NUEVO', imagen: 'assets/Categorias/Exfoliante.png' },
    { nombre: 'CUIDADO FACIAL', imagen: 'assets/Categorias/CuidadoFacial.jpg' },
    { nombre: 'ACCESORIOS', imagen: 'assets/Categorias/Accesorios.png' },
    { nombre: 'PERFUMES', imagen: 'assets/Categorias/Perfumes.png' },
    { nombre: 'MAQUILLAJE', imagen: 'assets/Categorias/Maquillaje.jpg' },
    { nombre: 'PRENDAS', imagen: 'assets/Categorias/Prendas.png' },
    { nombre: 'CUIDADO CORPORAL', imagen: 'assets/Categorias/BloqueadorSolar.png' },
    { nombre: 'OFERTAS', imagen: 'assets/Categorias/Ofertas.png' }
  ];

  irACategoria(categoria: any) {
    this.router.navigate(['/categoria', categoria.nombre.toLowerCase().replace(' ', '-')]);
  }
}
