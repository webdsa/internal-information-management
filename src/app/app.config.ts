import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { environment } from '../environments/environment.dev';
import { MSAL_INSTANCE, MsalService } from '@azure/msal-angular';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId,
      redirectUri: 'http://localhost:4200'
    }
  });
}

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes), provideClientHydration(),
      {
        provide: MSAL_INSTANCE,
        useFactory: MSALInstanceFactory
      },
      MsalService
  ]
};
