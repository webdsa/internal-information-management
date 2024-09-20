import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { HeaderTitleComponent } from '../../../shared/header-title/header-title.component';
import { CardComponent } from '../../../shared/card/card.component';
import { FormLabelComponent } from '../../../shared/form-label/form-label.component';
import { FormMsgErrorComponent } from '../../../shared/form-msg-error/form-msg-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { RoleTypeEnum, RoleTypeEnumTranslation } from '../../../core/enums/role-type.enum';
import { UsersService } from '../services/users.service';
import { UserModel } from '../../../core/models/user.model';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [CommonModule, HeaderTitleComponent, CardComponent, FormLabelComponent, FormMsgErrorComponent, FormsModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent {
  #usersService = inject(UsersService);

  user = input.required<UserModel>();
  onChange = output<boolean>();

  protected role: number = 0;

  public typeUserPermissionsArray = RoleTypeEnum.Array();

  updateUser() {
    const userRole = {
      userEmail: this.user().userEmail,
      roleId: this.role
    };
    this.#usersService.updateUserRole(userRole).mutateAsync(null);
  }

  cancel() {
    this.onChange.emit(true);
  }
  selectPermission(target: any) {
    if (!target.value) return;
    this.role = target.value;
  }
}
