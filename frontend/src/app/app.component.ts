import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly auth = inject(AuthService);

  isAuth = false;
  darkMode = false;

  ngOnInit(): void {
    this.darkMode = localStorage.getItem('byestef_theme') === 'dark';
    this.syncTheme();

    this.auth.isAuthenticated$.subscribe((value) => {
      this.isAuth = value;
    });
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('byestef_theme', this.darkMode ? 'dark' : 'light');
    this.syncTheme();
  }

  logout(): void {
    this.auth.logout();
  }

  private syncTheme(): void {
    document.body.classList.toggle('dark-theme', this.darkMode);
  }
}
