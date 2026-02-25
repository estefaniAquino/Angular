import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { InventarioService } from '../../services/inventario.service';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
})
export class InventarioComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly inventarioService = inject(InventarioService);

  productos: Producto[] = [];
  editandoId: string | null = null;
  cargando = false;

  // Formulario con validaciones básicas.
  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    unidad: ['pieza', [Validators.required]],
    cantidad: [0, [Validators.required, Validators.min(0)]],
    costoIngredientes: [0, [Validators.required, Validators.min(0)]],
    costoEmpaque: [0, [Validators.required, Validators.min(0)]],
    costoManoObra: [0, [Validators.required, Validators.min(0)]],
    margenGanancia: [30, [Validators.required, Validators.min(0)]],
    notas: [''],
  });

  ngOnInit(): void {
    this.cargarProductos();
  }

  /**
   * Carga el listado inicial y cuando hay cambios.
   */
  cargarProductos(): void {
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

  /**
   * Calculadora local para visualizar costos antes de guardar.
   */
  get calculoPrevio(): { costoTotal: number; precioVenta: number } {
    const value = this.form.getRawValue();
    const costoTotal =
      value.costoIngredientes + value.costoEmpaque + value.costoManoObra;
    const precioVenta = costoTotal * (1 + value.margenGanancia / 100);

    return {
      costoTotal: Number(costoTotal.toFixed(2)),
      precioVenta: Number(precioVenta.toFixed(2)),
    };
  }

  /**
   * Guarda creando o actualizando según estado de edición.
   */
  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();

    if (this.editandoId) {
      this.inventarioService
        .actualizarProducto(this.editandoId, payload)
        .subscribe(() => this.postGuardar());
      return;
    }

    this.inventarioService
      .crearProducto(payload)
      .subscribe(() => this.postGuardar());
  }

  /**
   * Carga datos de producto en el formulario para editar.
   */
  editar(producto: Producto): void {
    this.editandoId = producto.id ?? null;
    this.form.patchValue({
      nombre: producto.nombre,
      categoria: producto.categoria,
      unidad: producto.unidad,
      cantidad: producto.cantidad,
      costoIngredientes: producto.costoIngredientes,
      costoEmpaque: producto.costoEmpaque,
      costoManoObra: producto.costoManoObra,
      margenGanancia: producto.margenGanancia,
      notas: producto.notas,
    });
  }

  /**
   * Elimina un producto del inventario.
   */
  eliminar(id?: string): void {
    if (!id) {
      return;
    }

    const ok = window.confirm('¿Seguro que quieres eliminar este producto?');
    if (!ok) {
      return;
    }

    this.inventarioService.eliminarProducto(id).subscribe(() => {
      this.cargarProductos();
      if (this.editandoId === id) {
        this.cancelarEdicion();
      }
    });
  }

  /**
   * Limpia formulario y estado para empezar una captura nueva.
   */
  cancelarEdicion(): void {
    this.editandoId = null;
    this.form.reset({
      nombre: '',
      categoria: '',
      unidad: 'pieza',
      cantidad: 0,
      costoIngredientes: 0,
      costoEmpaque: 0,
      costoManoObra: 0,
      margenGanancia: 30,
      notas: '',
    });
  }

  private postGuardar(): void {
    this.cancelarEdicion();
    this.cargarProductos();
  }
}
