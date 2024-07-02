import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { provideMsal } from './auth/identity/msal.providers';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideQuillConfig } from 'ngx-quill';

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes), importProvidersFrom(BrowserAnimationsModule), provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideMsal(),
    provideToastr(),

  ]
};


