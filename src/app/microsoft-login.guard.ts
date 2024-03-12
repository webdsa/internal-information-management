import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn} from '@angular/router';
import { MsalService } from '@azure/msal-angular';


export const microsoftLoginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (inject(MsalService).instance.getActiveAccount() == null) {
         inject(Router).navigate(['/login']);
         return false;
  } else {
    return true;
  }
};
