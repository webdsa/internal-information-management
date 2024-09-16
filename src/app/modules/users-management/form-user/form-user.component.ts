import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { HeaderTitleComponent } from '../../../shared/header-title/header-title.component';
import { CardComponent } from '../../../shared/card/card.component';
import { FormLabelComponent } from '../../../shared/form-label/form-label.component';
import { FormMsgErrorComponent } from '../../../shared/form-msg-error/form-msg-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { RoleTypeEnum } from '../../../core/enums/role-type.enum';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [CommonModule, HeaderTitleComponent, CardComponent, FormLabelComponent, FormMsgErrorComponent, FormsModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent {
  user = input.required();
  onChange = output<boolean>();

  protected form: any;
  public typeUserPermissionsArray = Object.values(RoleTypeEnum)
    .filter((key) => typeof key === 'number')
    .map((key) => ({
      label: RoleTypeEnum[key as unknown as keyof typeof RoleTypeEnum],
      value: key
    }));

  ngOnInit() {
    console.log('Componente cargado');
  }

  updateUser() {}

  cancel() {
    this.onChange.emit(true);
  }
  selectPermission(value: any) {}
}
