import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { PatrimonyComponent } from './patrimony/patrimony.component';
import { InternalInformationComponent } from './internal-information/internal-information.component';
import { PropertyComponent } from './patrimony/property/property.component';
import { FormPropertyComponent } from './patrimony/property/form-property/form-property.component';
import { GuidsComponent } from './internal-information/components/guids/guids.component';

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
        children: [
            {
                path: 'property',
                title: 'App Property Page',
                component: PropertyComponent,
            },
            {
                path: 'new-property',
                title: 'Novo Imóvel',
                component: FormPropertyComponent,
            },
            {
                path: 'edit-property/:id',
                title: 'Editar Imóvel',
                component: FormPropertyComponent,
            }

        ]
    },
    {
        path: 'internal-information',
        title: 'App Internal Information Page',
        component: InternalInformationComponent,
        children: [
            {
                path: 'guids',
                title: 'App Guids Page',
                component: GuidsComponent,
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModulesRoutingModule { }
