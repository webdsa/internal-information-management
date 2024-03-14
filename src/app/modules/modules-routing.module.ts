import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentsComponent } from './documents/documents.component';
import { HousesLayoutComponent } from './houses-layout/houses-layout.component';
import { ResidentsComponent } from './residents/residents.component';
import { PropertiesComponent } from './properties/properties.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ReportsComponent } from './reports/reports.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { NgModule } from '@angular/core';
import { SignInComponent } from '../auth/signIn/signIn.component';

export const routes: Routes = [
    {
        path: '',
        title: 'App Dash Page',
        component: SignInComponent,
    },
    {
        path: 'documents',
        title: 'Documents',
        component: DocumentsComponent
    },
    {
        path: 'houses-layout',	
        title: 'Houses Layout',
        component: HousesLayoutComponent
    },
    {
        path: 'residents',
        title: 'Residents',
        component: ResidentsComponent
    },
    {
        path: 'properties"',
        title: 'Properties',
        component: PropertiesComponent
    },
    {
        path: 'invoices',
        title: 'Invoices',
        component: InvoicesComponent
    },
    {
        path: 'reports',
        title: 'Reports',
        component: ReportsComponent
    },
    {
        path: 'send-email',
        title: 'Send Email',
        component: SendEmailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ModulesRoutingModule {}