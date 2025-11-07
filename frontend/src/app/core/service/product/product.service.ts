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
    super(http, 'productos');   }

  
    getCategoria(categoria: string): Observable<Producto> {
      return this.http.get<Producto>(`${this.baseUrl}/productos/categoria/${categoria}`);
    }

}