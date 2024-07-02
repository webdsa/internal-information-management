import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';


export const MicrosoftLoginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (inject(MsalService).instance.getActiveAccount() != null) {
    inject(MsalBroadcastService).msalSubject$.subscribe({
      next: (msalSubject) => {
        if (msalSubject.eventType === 'msal:acquireTokenFailure') {
          inject(Router).navigate(['/signIn']);
          return false;
        } else return true;
      },
    });
    return true;
  }
  else {
    inject(Router).navigate(['/signIn']);
    return false;
  }
};

