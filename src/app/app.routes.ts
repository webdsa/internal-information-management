import { Routes } from '@angular/router';
import { SignInComponent } from './auth/signIn/signIn.component';
import { MicrosoftLoginGuard } from './microsoft-login.guard';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { PrivacyPolicyComponent } from './modules/privacy-policy/privacy-policy.component';
import { NoPermissionComponent } from './modules/no-permission/no-permission.component';
import { SupportComponent } from './modules/support/support.component';

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
    { path: '**', component: NotFoundComponent },
    {
        path: 'privacy-policy',
        title: 'Política de Privacidade',
        component: PrivacyPolicyComponent,
    },
    {
        path: 'no-permissions',
        title: 'Sem permissöes para estar aqui',
        component: NoPermissionComponent,
    },
    {
        path: 'support',
        title: 'Ajuda',
        component: SupportComponent,
    }


];
