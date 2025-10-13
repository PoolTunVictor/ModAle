import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoriPageComponent } from './pages/categori-page/categori-page.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

export const routes: Routes = [
    // Ruta inicial → login
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    // Después del login → ProductCatalogComponent
    { path: 'product-catalog', component: ProductCatalogComponent },

    // Catálogo principal (HomePage)
    { path: 'catalogo', component: HomePageComponent },

    // Página de categoría específica
    { path: 'categoria/:categoria', component: CategoriPageComponent },

    { path: 'carrito', component: CarritoComponent },

    // Cualquier ruta inválida → login
    { path: '**', redirectTo: 'login' }

    
];
