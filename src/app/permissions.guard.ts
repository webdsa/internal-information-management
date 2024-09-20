import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth/service/authService';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const PermissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getUserPermissionsByToken().pipe(
    map((res: any) => {
      const permissions = res.data;
      if (permissions) {
        authService.setPermissions(permissions);
        return true;
      } else {
        router.navigate(['/no-permissions']);
        return false;
      }
    }),
    catchError((error: any) => {
      console.log(error, 'erro;');
      router.navigate(['/signIn']);
      return [false];
    })
  );
};
