import { Routes } from '@angular/router';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';

export const routes: Routes = [
    {path: '', component: ProductCatalogComponent},
    {path: '**', redirectTo:''}
];
