import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { PatrimonyComponent } from './patrimony/patrimony.component';
import { InternalInformationComponent } from './internal-information/internal-information.component';

export const routes: Routes = [
    {
        path: '',
        title: 'App Dash Page',
        component: DashboardComponent,
    },
    {
        path: 'patrimony',
        title: 'App Patrimony Page',
        component: PatrimonyComponent,
    },
    {
        path: 'internal-information',
        title: 'App Internal Information Page',
        component: InternalInformationComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ModulesRoutingModule {}
