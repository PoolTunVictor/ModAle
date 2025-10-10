import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'assets/script.js'; // <-- Carga desde assets
    script.onload = () => console.log('Script cargado correctamente');
    document.body.appendChild(script);
  }
}
