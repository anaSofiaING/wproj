import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicacion } from '../models/publicacion.model';

const baseUrl = 'http://localhost:8080/api/publicacion';
@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(baseUrl);
  }

  get(id: any): Observable<Publicacion> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${baseUrl}?title=${title}`);
  }
}
