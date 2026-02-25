import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
import { RecetasComponent } from './components/recetas/recetas.component';
import { VentasComponent } from './components/ventas/ventas.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ingredientes', component: IngredientesComponent },
  { path: 'recetas', component: RecetasComponent },
  { path: 'ventas', component: VentasComponent },
];
