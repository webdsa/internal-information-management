import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { PatrimonyComponent } from './patrimony/patrimony.component';
import { InternalInformationComponent } from './internal-information/internal-information.component';
import { PropertyComponent } from './patrimony/property/property.component';
import { FormPropertyComponent } from './patrimony/property/form-property/form-property.component';
import { GuidsComponent } from './internal-information/components/guids/guids.component';
import { ResidentComponent } from './patrimony/resident/resident.component';
import { FormResidentComponent } from './patrimony/resident/form-resident/form-resident.component';
import { ProviderComponent } from './patrimony/provider/provider.component';
import { FormProviderComponent } from './patrimony/provider/form-provider/form-provider.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

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
                path: 'property/edit',
                title: 'Editar Imóvel',
                component: FormPropertyComponent,
            },
            {
                path: 'new-property',
                title: 'Novo Imóvel',
                component: FormPropertyComponent,
            },
            {
                path: 'resident',
                title: 'App Resident Page',
                component: ResidentComponent,
            },
            {
                path: 'new-resident',
                title: 'Novo Morador',
                component: FormResidentComponent,
            },
            {
                path: 'provider',
                title: 'App Provider Page',
                component: ProviderComponent,
            },
            {
                path: 'new-provider',
                title: 'Novo Fornecedor',
                component: FormProviderComponent,
            },
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
    {
        path: 'privacy-policy',
        title: 'Política de Privacidade',
        component: PrivacyPolicyComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ModulesRoutingModule { }
