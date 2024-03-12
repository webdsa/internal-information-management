import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from '../auth/sign-in/sign-in.component';
import { ModulesRoutingModule } from './modules-routing.module';

@NgModule({
    declarations: [SignInComponent],
    imports: [FormsModule, ReactiveFormsModule,ModulesRoutingModule],
    exports: [SignInComponent]
})

export class ModulesModule {}
