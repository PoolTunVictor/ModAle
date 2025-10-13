import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { CategoriPageComponent } from './pages/categori-page/categori-page.component';

export const routes: Routes = [
    // Ruta inicial va al login
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    // Home page
    { path: 'home', component: HomePageComponent },

    // Catálogo de productos
    { path: 'catalogo', component: ProductCatalogComponent },

    // Página de categorías con parámetro
    { path: 'categoria/:nombre', component: CategoriPageComponent },

    // Cualquier ruta inválida redirige al login
    { path: '**', redirectTo: 'login' }
];
