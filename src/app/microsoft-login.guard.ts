import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { MsalService } from '@azure/msal-angular';


export const MicrosoftLoginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (inject(MsalService).instance.getActiveAccount() != null) return true;
  inject(Router).navigate(['/signIn']);
  return false;
};

