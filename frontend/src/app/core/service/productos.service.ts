import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private jsonPath = 'assets/data/productos.json';

  constructor(private http: HttpClient) {}

  // Obtener productos por categoría desde el JSON
  getProductosPorCategoria(categoria: string): Observable<any[]> {
    return this.http.get<any>(this.jsonPath).pipe(
      map((productos: any) => productos[categoria] || [])
    );
  }

  // Obtener todas las categorías (las llaves del JSON)
  getCategorias(): Observable<string[]> {
    return this.http.get<any>(this.jsonPath).pipe(
      map((productos: any) => Object.keys(productos))
    );
  }
}
