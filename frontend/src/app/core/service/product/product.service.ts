import { Injectable } from '@angular/core';
import { Producto } from '../../models/producto';
import { BaseService } from '../base-service/base-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Producto> {
  constructor(http: HttpClient) {
    super(http, 'productos');
  }

  // Obtener productos por categoría (corregido)
 getCategoria(categoria: string): Observable<Producto[]> {
  return this.http.get<Producto[]>(
    `${this.baseUrl}/productos/categoria/${categoria}`
  );
}

  // Obtener producto por ID
  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/productos/${id}`);
  }

  getByIds(ids: number[]): Observable<Producto[]> {
    const params = ids.join(',');
    return this.http.get<Producto[]>(`${this.baseUrl}/batch?ids=${params}`);
  }

  descontarStock(id_producto: number, cantidad: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/descontar/${id_producto}?cantidad=${cantidad}`,
      {}
    );
  }
}
