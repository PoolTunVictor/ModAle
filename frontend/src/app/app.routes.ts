import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoriPageComponent } from './pages/categori-page/categori-page.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductsTableComponent } from './pages/products-table/products-table.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './core/service/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'product-catalog', component: ProductCatalogComponent },
  { path: 'catalogo', component: HomePageComponent },
  { path: 'categoria/:categoria', component: CategoriPageComponent },
  { path: 'carrito', component: CarritoComponent },

  // Rutas admin protegidas
  {
  path: 'admin',
  component: AdminLayoutComponent,
  //canActivate: [AuthGuard],  // 🔹 Protege todas las rutas admin
  children: [
    { path: 'agregar-producto', component: ProductAddComponent },
    { path: 'products-table', component: ProductsTableComponent },
    { path: 'editar-producto/:id', component: ProductEditComponent },
    { path: '', redirectTo: 'products-table', pathMatch: 'full' }
  ]
},

  { path: '**', redirectTo: 'login' }
];
