import { inject, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModulesRoutingModule } from './modules-routing.module';
import { AuthService } from '../auth/service/authService';

@NgModule({
    declarations: [],
    imports: [FormsModule, ReactiveFormsModule,ModulesRoutingModule],
    exports: []
})

export class ModulesModule {
    #authService = inject(AuthService);

    constructor() {
        this.getPermissions();
    }

    getPermissions(){
        this.#authService.getUserPermissionsByToken();
    }
}
