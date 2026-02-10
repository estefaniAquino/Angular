import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CostSummary, InventoryItem } from '../models/inventory-item.model';

@Injectable({ providedIn: 'root' })
export class InventoryApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.apiUrl}/inventory`);
  }

  create(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(`${this.apiUrl}/inventory`, item);
  }

  update(id: string, item: InventoryItem): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.apiUrl}/inventory/${id}`, item);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/inventory/${id}`);
  }

  costSummary(): Observable<CostSummary> {
    return this.http.get<CostSummary>(`${this.apiUrl}/inventory/cost-summary`);
  }
}
