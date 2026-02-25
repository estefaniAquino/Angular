import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ingrediente } from '../../models/domain.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ingredientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ingredientes.component.html',
  styleUrl: './ingredientes.component.css',
})
export class IngredientesComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiService);

  ingredientes: Ingrediente[] = [];
  editandoId: string | null = null;

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    unidadBase: ['g', Validators.required],
    costoUnidad: [0, [Validators.required, Validators.min(0)]],
    stockActual: [0, [Validators.required, Validators.min(0)]],
    notas: [''],
  });

  ngOnInit(): void { this.cargar(); }

  cargar(): void {
    this.api.getIngredientes().subscribe((data) => (this.ingredientes = data));
  }

  guardar(): void {
    if (this.form.invalid) return;

    const payload = this.form.getRawValue();

    if (this.editandoId) {
      this.api.actualizarIngrediente(this.editandoId, payload).subscribe(() => this.limpiarYRecargar());
      return;
    }

    this.api.crearIngrediente(payload).subscribe(() => this.limpiarYRecargar());
  }

  editar(ingrediente: Ingrediente): void {
    this.editandoId = ingrediente.id || null;
    this.form.patchValue({
      nombre: ingrediente.nombre,
      unidadBase: ingrediente.unidadBase,
      costoUnidad: ingrediente.costoUnidad,
      stockActual: ingrediente.stockActual,
      notas: ingrediente.notas,
    });
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.form.reset({ nombre: '', unidadBase: 'g', costoUnidad: 0, stockActual: 0, notas: '' });
  }

  eliminar(id?: string): void {
    if (!id) return;
    const ok = window.confirm('¿Seguro que quieres eliminar este ingrediente?');
    if (!ok) return;

    this.api.eliminarIngrediente(id).subscribe(() => this.cargar());
  }

  private limpiarYRecargar(): void {
    this.cancelarEdicion();
    this.cargar();
  }
}
