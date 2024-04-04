import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { SignInComponent } from '../auth/signIn/signIn.component';

export const routes: Routes = [
    {
        path: '',
        title: 'App Dash Page',
        component: SignInComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ModulesRoutingModule {}
