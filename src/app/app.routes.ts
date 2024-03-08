import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DocumentsComponent } from './modules/documents/documents.component';
import { HousesLayoutComponent } from './modules/houses-layout/houses-layout.component';
import { ResidentsComponent } from './modules/residents/residents.component';
import { PropertiesComponent } from './modules/properties/properties.component';
import { InvoicesComponent } from './modules/invoices/invoices.component';
import { ReportsComponent } from './modules/reports/reports.component';
import { SendEmailComponent } from './modules/send-email/send-email.component';
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Auth Page',
        component: LoginComponent
    },
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        title: 'App Dash Page',
        component: DashboardComponent
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
