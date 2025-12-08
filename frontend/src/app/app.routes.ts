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
import { ReportesComponent } from './pages/reportes/reportes.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserTableComponent } from './pages/user-table/user-table.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { AdminUsersComponent } from './pages/admin-user/admin-user.component';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, // ✅ ruta registro


  // 🔹 Layout de usuario (con header)
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'product-catalog', component: ProductCatalogComponent },
      { path: 'catalogo', component: HomePageComponent },
      { path: 'categoria/:categoria', component: CategoriPageComponent },
      { path: 'carrito', component: CarritoComponent },
      {path: 'pedidos', component: PedidosComponent},
      
    ]
  },

  // 🔹 Layout admin (sin header de usuario)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'reportes', component: ReportesComponent },
      { path: 'fichas', component: FichasComponent },
      { path: 'ficha-detalle/:id', component: FichaDetalleComponent },
      { path: 'agregar-producto', component: ProductAddComponent },
      { path: 'products-table', component: ProductsTableComponent },
      { path: 'editar-producto/:id', component: ProductEditComponent },
       { path: 'inicio', component: FichasComponent },
       {path: 'user-table', component: UserTableComponent},
       {path: 'admin-user', component: AdminUsersComponent},
      { path: '', redirectTo: 'reportes', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
