import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import { LOCALE_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

// Registramos español-México para formatear moneda MXN de manera correcta.
registerLocaleData(localeEsMx);

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), { provide: LOCALE_ID, useValue: 'es-MX' }],
}).catch((error) => console.error(error));
