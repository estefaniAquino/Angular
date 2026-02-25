import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ingrediente, Receta, Venta } from '../models/domain.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.baseUrl}/ingredientes`);
  }

  crearIngrediente(payload: Ingrediente): Observable<Ingrediente> {
    return this.http.post<Ingrediente>(`${this.baseUrl}/ingredientes`, payload);
  }

  actualizarIngrediente(id: string, payload: Ingrediente): Observable<Ingrediente> {
    return this.http.put<Ingrediente>(`${this.baseUrl}/ingredientes/${id}`, payload);
  }

  eliminarIngrediente(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ingredientes/${id}`);
  }

  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.baseUrl}/recetas`);
  }

  crearReceta(payload: Receta): Observable<Receta> {
    return this.http.post<Receta>(`${this.baseUrl}/recetas`, payload);
  }

  actualizarReceta(id: string, payload: Receta): Observable<Receta> {
    return this.http.put<Receta>(`${this.baseUrl}/recetas/${id}`, payload);
  }

  eliminarReceta(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/recetas/${id}`);
  }

  getVentas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ventas`);
  }

  crearVenta(payload: Venta): Observable<any> {
    return this.http.post(`${this.baseUrl}/ventas`, payload);
  }

  actualizarVenta(id: string, payload: Venta): Observable<any> {
    return this.http.put(`${this.baseUrl}/ventas/${id}`, payload);
  }

  eliminarVenta(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ventas/${id}`);
  }

  reporteVentas(periodo: 'dia' | 'semana' | 'quincena' | 'mes'): Observable<any> {
    return this.http.get(`${this.baseUrl}/reportes/ventas?periodo=${periodo}`);
  }
}
