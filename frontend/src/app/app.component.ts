import { Component } from '@angular/core';
import { InventarioComponent } from './components/inventario/inventario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InventarioComponent],
  template: '<app-inventario />',
})
export class AppComponent {}
