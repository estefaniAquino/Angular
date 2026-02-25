import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Receta } from '../../models/domain.model';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css',
})
export class VentasComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiService);

  recetas: Receta[] = [];
  ventas: any[] = [];
  itemsVenta: Array<{ recetaId: string; cantidad: number; precioUnitario?: number }> = [];

  form = this.fb.nonNullable.group({
    fecha: [new Date().toISOString().slice(0, 16), Validators.required],
    canal: ['Mostrador', Validators.required],
    recetaId: ['', Validators.required],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    precioUnitario: [0, [Validators.min(0)]],
    notas: [''],
  });

  ngOnInit(): void {
    this.api.getRecetas().subscribe((d) => (this.recetas = d));
    this.cargarVentas();
  }

  cargarVentas(): void {
    this.api.getVentas().subscribe((d) => (this.ventas = d));
  }

  agregarItem(): void {
    if (!this.form.controls.recetaId.value) return;
    this.itemsVenta.push({
      recetaId: this.form.controls.recetaId.value,
      cantidad: Number(this.form.controls.cantidad.value),
      precioUnitario: Number(this.form.controls.precioUnitario.value) || undefined,
    });
    this.form.patchValue({ recetaId: '', cantidad: 1, precioUnitario: 0 });
  }

  quitarItem(index: number): void {
    this.itemsVenta.splice(index, 1);
  }

  guardarVenta(): void {
    if (this.itemsVenta.length === 0) return;
    this.api
      .crearVenta({
        fecha: new Date(this.form.controls.fecha.value).toISOString(),
        canal: this.form.controls.canal.value,
        items: this.itemsVenta,
        notas: this.form.controls.notas.value,
      } as any)
      .subscribe(() => {
        this.itemsVenta = [];
        this.form.patchValue({ canal: 'Mostrador', recetaId: '', cantidad: 1, precioUnitario: 0, notas: '' });
        this.cargarVentas();
      });
  }

  nombreReceta(id: string): string {
    return this.recetas.find((r) => r.id === id)?.nombre || id;
  }
}
