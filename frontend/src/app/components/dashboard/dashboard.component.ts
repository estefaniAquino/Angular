import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly api = inject(ApiService);

  cargando = false;
  periodo: 'dia' | 'semana' | 'quincena' | 'mes' = 'mes';
  reporte: any = null;

  ngOnInit(): void {
    this.cargarReporte();
  }

  cargarReporte(): void {
    this.cargando = true;
    this.api.reporteVentas(this.periodo).subscribe({
      next: (data) => {
        this.reporte = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      },
    });
  }
}
