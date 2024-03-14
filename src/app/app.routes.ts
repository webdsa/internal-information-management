import { Routes } from '@angular/router';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { SignInComponent } from './auth/signIn/signIn.component';
import { MsalGuard } from '@azure/msal-angular';
import { MicrosoftLoginGuard } from './microsoft-login.guard';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
    {
        path: '',
        canActivate: [MicrosoftLoginGuard],
        loadChildren: () => import('./modules/modules.module').then((m) => m.ModulesModule),
    },
    {
        path: 'signIn',
        component: SignInComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    { path: '**', component: NotFoundComponent }

];