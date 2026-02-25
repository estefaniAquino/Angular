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
  editandoId: string | null = null;

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

    const payload: any = {
      fecha: new Date(this.form.controls.fecha.value).toISOString(),
      canal: this.form.controls.canal.value,
      items: this.itemsVenta,
      notas: this.form.controls.notas.value,
    };

    if (this.editandoId) {
      this.api.actualizarVenta(this.editandoId, payload).subscribe(() => this.limpiarYRecargar());
      return;
    }

    this.api.crearVenta(payload).subscribe(() => this.limpiarYRecargar());
  }

  editar(venta: any): void {
    this.editandoId = venta.id;
    this.itemsVenta = (venta.items || []).map((i: any) => ({
      recetaId: i.recetaId,
      cantidad: Number(i.cantidad || 1),
      precioUnitario: Number(i.precioUnitario || 0),
    }));

    this.form.patchValue({
      fecha: (venta.fecha || new Date().toISOString()).slice(0, 16),
      canal: venta.canal || 'Mostrador',
      recetaId: '',
      cantidad: 1,
      precioUnitario: 0,
      notas: venta.notas || '',
    });
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.itemsVenta = [];
    this.form.patchValue({
      fecha: new Date().toISOString().slice(0, 16),
      canal: 'Mostrador',
      recetaId: '',
      cantidad: 1,
      precioUnitario: 0,
      notas: '',
    });
  }

  eliminar(id?: string): void {
    if (!id) return;
    const ok = window.confirm('¿Seguro que quieres eliminar esta venta?');
    if (!ok) return;

    this.api.eliminarVenta(id).subscribe(() => {
      this.cargarVentas();
      if (this.editandoId === id) this.cancelarEdicion();
    });
  }

  nombreReceta(id: string): string {
    return this.recetas.find((r) => r.id === id)?.nombre || id;
  }

  private limpiarYRecargar(): void {
    this.cancelarEdicion();
    this.cargarVentas();
  }
}
