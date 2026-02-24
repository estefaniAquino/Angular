import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventarioComponent } from './components/inventario/inventario.component';

/**
 * Rutas principales de la aplicación.
 * - dashboard: vista resumen
 * - inventario: CRUD completo
 */
export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: '**', redirectTo: 'dashboard' },
];
