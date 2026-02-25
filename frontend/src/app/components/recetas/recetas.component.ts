import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Ingrediente, Receta } from '../../models/domain.model';

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css',
})
export class RecetasComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiService);

  ingredientes: Ingrediente[] = [];
  recetas: Receta[] = [];
  ingredientesReceta: Array<{ ingredienteId: string; cantidadUsada: number }> = [];

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    categoria: ['Tortas', Validators.required],
    porciones: [12, [Validators.required, Validators.min(1)]],
    costoEmpaque: [0, [Validators.required, Validators.min(0)]],
    costoManoObra: [0, [Validators.required, Validators.min(0)]],
    gastosFijos: [0, [Validators.required, Validators.min(0)]],
    margenGanancia: [40, [Validators.required, Validators.min(0)]],
    ingredienteId: ['', Validators.required],
    cantidadUsada: [0, [Validators.required, Validators.min(0.01)]],
    notas: [''],
  });

  ngOnInit(): void {
    this.api.getIngredientes().subscribe((d) => (this.ingredientes = d));
    this.cargarRecetas();
  }

  cargarRecetas(): void {
    this.api.getRecetas().subscribe((d) => (this.recetas = d));
  }

  agregarIngrediente(): void {
    if (!this.form.controls.ingredienteId.value || this.form.controls.cantidadUsada.invalid) return;
    this.ingredientesReceta.push({
      ingredienteId: this.form.controls.ingredienteId.value,
      cantidadUsada: Number(this.form.controls.cantidadUsada.value),
    });
    this.form.patchValue({ ingredienteId: '', cantidadUsada: 0 });
  }

  quitarIngrediente(index: number): void {
    this.ingredientesReceta.splice(index, 1);
  }

  guardarReceta(): void {
    if (this.form.invalid || this.ingredientesReceta.length === 0) return;

    const payload: Receta = {
      nombre: this.form.controls.nombre.value,
      categoria: this.form.controls.categoria.value,
      porciones: Number(this.form.controls.porciones.value),
      costoEmpaque: Number(this.form.controls.costoEmpaque.value),
      costoManoObra: Number(this.form.controls.costoManoObra.value),
      gastosFijos: Number(this.form.controls.gastosFijos.value),
      margenGanancia: Number(this.form.controls.margenGanancia.value),
      ingredientes: this.ingredientesReceta,
      notas: this.form.controls.notas.value,
    };

    this.api.crearReceta(payload).subscribe(() => {
      this.form.patchValue({
        nombre: '', categoria: 'Tortas', porciones: 12, costoEmpaque: 0, costoManoObra: 0,
        gastosFijos: 0, margenGanancia: 40, notas: '', ingredienteId: '', cantidadUsada: 0,
      });
      this.ingredientesReceta = [];
      this.cargarRecetas();
    });
  }

  eliminar(id?: string): void {
    if (!id) return;
    this.api.eliminarReceta(id).subscribe(() => this.cargarRecetas());
  }

  nombreIngrediente(id: string): string {
    return this.ingredientes.find((i) => i.id === id)?.nombre || id;
  }
}
