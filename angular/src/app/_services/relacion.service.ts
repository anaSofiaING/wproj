import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Relacion } from '../models/relacion.model';

const baseUrl = 'http://localhost:8080/api/relacion';

@Injectable({
  providedIn: 'root'
})
export class RelacionService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Relacion[]> {
    return this.http.get<Relacion[]>(baseUrl);
  }

  get(id: any): Observable<Relacion> {
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

  findByTitle(title: any): Observable<Relacion[]> {
    return this.http.get<Relacion[]>(`${baseUrl}?title=${title}`);
  }
}
