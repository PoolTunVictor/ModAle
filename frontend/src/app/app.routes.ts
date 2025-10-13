import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // ruta inicial redirige al login
    { path: 'login', component: LoginComponent },
    { path: 'catalogo', component: ProductCatalogComponent },
    { path: '**', redirectTo: 'login' } // cualquier ruta inválida redirige al login
];
