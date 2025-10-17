import { Routes } from '@angular/router';
import { FichasComponent } from './pages/fichas/fichas.component';
import { FichaDetalleComponent } from './pages/fichas/ficha-detalle/ficha-detalle.component';

export const routes: Routes = [
  { path: '', redirectTo: 'fichas', pathMatch: 'full' },
  { path: 'fichas', component: FichasComponent },
  { path: 'fichas/:id', component: FichaDetalleComponent },
   { path: 'fichas-detalle', component: FichaDetalleComponent },
];
