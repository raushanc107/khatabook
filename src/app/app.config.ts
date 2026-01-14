import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideNativeDateAdapter } from '@angular/material/core';

import { customerReducer, transactionReducer } from './store/khatabook.reducer';
import { KhatabookEffects } from './store/khatabook.effects';

import { registerLocaleData } from '@angular/common';
import localeEnIn from '@angular/common/locales/en-IN';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeEnIn);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'en-IN' },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      customers: customerReducer,
      transactions: transactionReducer
    }),
    provideEffects([KhatabookEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};
