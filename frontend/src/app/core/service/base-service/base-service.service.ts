import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {

  protected baseUrl = 'https://modale-production.up.railway.app/api';

  constructor(protected http: HttpClient, private endpoint: string) {}

  get(params?: any): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}/`, { params });
  }

  getId(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`);
  }

  post(data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.endpoint}/`, data);
  }

  put(id: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${id}`, data);
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${this.endpoint}/${id}`);
  }
}

