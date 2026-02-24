import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { InventarioService } from '../../services/inventario.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly inventarioService = inject(InventarioService);

  productos: Producto[] = [];
  cargando = false;

  ngOnInit(): void {
    this.cargarResumen();
  }

  /**
   * Carga el inventario para calcular métricas del dashboard.
   */
  cargarResumen(): void {
    this.cargando = true;
    this.inventarioService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      },
    });
  }

  get totalProductos(): number {
    return this.productos.length;
  }

  get valorInventario(): number {
    return this.productos.reduce(
      (acc, p) => acc + (p.costoTotal || 0) * (p.cantidad || 0),
      0,
    );
  }

  get ventaPotencial(): number {
    return this.productos.reduce(
      (acc, p) => acc + (p.precioVenta || 0) * (p.cantidad || 0),
      0,
    );
  }
}
