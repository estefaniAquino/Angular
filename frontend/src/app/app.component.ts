import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <main class="app-shell">
      <app-navbar />
      <router-outlet />
    </main>
  `,
  styles: [
    `
      .app-shell {
        max-width: 1150px;
        margin: 0 auto;
        padding: 1.2rem;
      }
    `,
  ],
})
export class AppComponent {}
