import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoriPageComponent } from './pages/categori-page/categori-page.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'product-catalog', component: ProductCatalogComponent },
    { path: 'catalogo', component: HomePageComponent },
    { path: 'categoria/:categoria', component: CategoriPageComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: '**', redirectTo: 'login' }
];
