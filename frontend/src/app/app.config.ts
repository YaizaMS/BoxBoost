import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const customTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 300,
  hideDelay: 300,
  touchendHideDelay: 100,
  position: 'above',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule),
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: customTooltipDefaults },
  ]
};
