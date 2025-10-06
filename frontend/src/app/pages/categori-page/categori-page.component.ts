import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categori-page',
  imports: [CommonModule],
  templateUrl: './categori-page.component.html',
  styleUrls: ['./categori-page.component.css'],
})
export class CategoriPageComponent {
  productos = [
    {
      nombre: 'Crema de noche',
      precioOriginal: 320,
      precio: 318,
      imagen: 'assets/categorias/crema.jpg',
      etiqueta: 'Oferta',
    },
    {
      nombre: 'Crema de manos',
      precio: 89,
      imagen: 'assets/categorias/manos.jpg',
    },
    {
      nombre: 'Hidratante facial 15 SPF',
      precio: 320,
      imagen: 'assets/categorias/hidratante.jpg',
    },
    {
      nombre: 'Retinol corrector nocturno',
      precio: 320,
      imagen: 'assets/categorias/retinol.jpg',
      etiqueta: 'Nuevo',
    },
    {
      nombre: 'Exfoliante facial nocturno',
      precio: 150,
      imagen: 'assets/categorias/exfoliante.jpg',
    },
    {
      nombre: 'Reparador nocturno',
      precio: 320,
      imagen: 'assets/categorias/reparador.jpg',
      etiqueta: 'Top venta',
    },
    {
      nombre: 'Limpiador facial antioxidante',
      precio: 220,
      imagen: 'assets/categorias/limpiador.jpg',
    },
    {
      nombre: 'Mascarilla de carbón vegetal',
      precio: 180,
      imagen: 'assets/categorias/mascarilla.jpg',
    },
  ];
}
