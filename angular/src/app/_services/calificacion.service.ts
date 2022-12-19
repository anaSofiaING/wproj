import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calificacion } from '../models/calificacion.model';

const baseUrl = 'http://localhost:8080/api/calificacion';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(baseUrl);
  }

  get(id: any): Observable<Calificacion> {
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

  findByTitle(title: any): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(`${baseUrl}?title=${title}`);
  }
}