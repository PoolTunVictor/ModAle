import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoriPageComponent } from './pages/categori-page/categori-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'categoria/:nombre', component: CategoriPageComponent },
  { path: '**', redirectTo: '' }
];
