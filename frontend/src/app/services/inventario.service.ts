import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/inventario`;

  /**
   * Consulta todos los productos.
   */
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl);
  }

  /**
   * Crea un nuevo producto.
   */
  crearProducto(payload: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.baseUrl, payload);
  }

  /**
   * Actualiza un producto existente.
   */
  actualizarProducto(id: string, payload: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.baseUrl}/${id}`, payload);
  }

  /**
   * Elimina un producto por su ID.
   */
  eliminarProducto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
