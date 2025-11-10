import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoriPageComponent } from './pages/categori-page/categori-page.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductsTableComponent } from './pages/products-table/products-table.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { FichasComponent } from './pages/fichas/fichas.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from '../layouts/layout-users/layout-users.component';
import { FichaDetalleComponent } from './pages/fichas/ficha-detalle/ficha-detalle.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // 🔹 Layout de usuario (con header)
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'product-catalog', component: ProductCatalogComponent },
      { path: 'catalogo', component: HomePageComponent },
      { path: 'categoria/:categoria', component: CategoriPageComponent },
      { path: 'carrito', component: CarritoComponent },
    ]
  },

  // 🔹 Layout admin (sin header de usuario)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'inicio', component: FichasComponent },
      { path: 'fichas', component: FichasComponent },
      { path: 'ficha-detalle/:id', component: FichaDetalleComponent },
      { path: 'agregar-producto', component: ProductAddComponent },
      { path: 'products-table', component: ProductsTableComponent },
      { path: 'editar-producto/:id', component: ProductEditComponent },
      { path: '', redirectTo: 'products-table', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
