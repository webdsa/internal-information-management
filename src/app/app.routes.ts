import { Routes } from '@angular/router';
import { SignInComponent } from './auth/signIn/signIn.component';
import { MicrosoftLoginGuard } from './microsoft-login.guard';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { PropertyComponent } from './modules/patrimony/property/property.component';
import { PrivacyPolicyComponent } from './modules/privacy-policy/privacy-policy.component';

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
    }

];
