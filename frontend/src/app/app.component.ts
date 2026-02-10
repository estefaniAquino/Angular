import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryItem, CostSummary } from './models/inventory-item.model';
import { InventoryApiService } from './services/inventory-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  items: InventoryItem[] = [];
  selectedItemId: string | null = null;
  loading = false;

  summary: CostSummary = {
    totalInversion: 0,
    totalVentaPotencial: 0,
    utilidadEstimada: 0
  };

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    categoria: ['', [Validators.required]],
    unidadMedida: ['unidad', [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(0)]],
    unitCost: [0, [Validators.required, Validators.min(0)]],
    salePrice: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly inventoryApi: InventoryApiService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;

    this.inventoryApi.list().subscribe({
      next: (items) => {
        this.items = items;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });

    this.inventoryApi.costSummary().subscribe({
      next: (summary) => {
        this.summary = summary;
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    const request = this.selectedItemId
      ? this.inventoryApi.update(this.selectedItemId, payload)
      : this.inventoryApi.create(payload);

    request.subscribe(() => {
      this.resetForm();
      this.loadAll();
    });
  }

  edit(item: InventoryItem): void {
    this.selectedItemId = item.id ?? null;
    this.form.patchValue({
      nombre: item.nombre,
      categoria: item.categoria,
      unidadMedida: item.unidadMedida,
      quantity: item.quantity,
      unitCost: item.unitCost,
      salePrice: item.salePrice
    });
  }

  delete(id?: string): void {
    if (!id) {
      return;
    }

    this.inventoryApi.remove(id).subscribe(() => {
      if (this.selectedItemId === id) {
        this.resetForm();
      }
      this.loadAll();
    });
  }

  resetForm(): void {
    this.selectedItemId = null;
    this.form.reset({
      nombre: '',
      categoria: '',
      unidadMedida: 'unidad',
      quantity: 1,
      unitCost: 0,
      salePrice: 0
    });
  }
}
