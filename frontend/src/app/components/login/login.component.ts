import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  error = '';
  cargando = false;

  form = this.fb.nonNullable.group({
    email: ['admin@byestef.com', [Validators.required, Validators.email]],
    password: ['ByEstef123!', [Validators.required]],
  });

  ingresar(): void {
    if (this.form.invalid || this.cargando) return;

    this.error = '';
    this.cargando = true;

    const { email, password } = this.form.getRawValue();

    this.auth.login(email, password).subscribe({
      next: () => {
        document.body.classList.add('dashboard-fade-in');
        setTimeout(() => document.body.classList.remove('dashboard-fade-in'), 700);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Credenciales inválidas. Revisa email y contraseña.';
        this.cargando = false;
      },
      complete: () => {
        this.cargando = false;
      },
    });
  }
}
