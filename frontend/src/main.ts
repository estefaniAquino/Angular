import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import { LOCALE_ID } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

// Registramos español-México para formatear moneda MXN de manera correcta.
registerLocaleData(localeEsMx);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    { provide: LOCALE_ID, useValue: 'es-MX' },
  ],
}).catch((error) => console.error(error));
