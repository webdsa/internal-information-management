import { Routes } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { microsoftLoginGuard } from './microsoft-login.guard';
import { SignInComponent } from './auth/sign-in/sign-in.component';

export const routes: Routes = [
    {
        path: '',
        canActivate: [microsoftLoginGuard],
        loadChildren: () => import('./modules/modules.module').then((m) => m.ModulesModule),
    },
    {
        path: 'login',
        component: SignInComponent,
        // loadChildren: () => import('./modules/modules.module').then((m) => m.ModulesModule),
    },
    { path: '**', component: NotFoundComponent }

];
