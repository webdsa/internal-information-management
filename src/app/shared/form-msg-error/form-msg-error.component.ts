import { CommonModule } from '@angular/common';
import {Component, Input, SimpleChanges} from '@angular/core';
import {cnpj, cpf} from 'cpf-cnpj-validator';

enum typeValid {
  Money = 1,
  DateBasic = 2,
  Required = 3,
  Valid = 4
}

@Component({
  selector: 'app-form-msg-error',
  templateUrl: './form-msg-error.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./form-msg-error.component.scss'],
})
export class FormMsgErrorComponent {
  @Input() valid: boolean | undefined;
  @Input() type!: typeValid;
  @Input() value: any;
  @Input() msg: string | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (this.checkChanges(changes, 'value')) {
      this.ValidValue();
    }
  }

  checkChanges(changes: SimpleChanges, values: string): boolean {
    return changes[values] && changes[values]?.previousValue != changes[values]?.currentValue;
  }

  ValidValue(): void {
    this.valid = false;
    this.msg = '';

    switch (this.type) {
      case typeValid.Required: {
        this.valid = true;
        this.ValidRequired();
        break;
      }
      case typeValid.Money: {
        this.valid = true;
        this.ValidNumber();
        this.ValidZeroOrNegative();
        break;
      }
      case typeValid.DateBasic: {
        this.valid = true;
        this.ValidDate();
        break;
      }
      case typeValid.Valid: {
        this.valid = true;
        this.ValidDocument();
        break;
      }
    }
  }

  ValidDate() {
    const val = new Date(Date.parse(this.value));
    if (isNaN(val.getTime())) this.msg = 'Valor é requerido';
  }

  ValidRequired() {
    if (this.value == '' || this.value.length == 0 || this.value == null || !this.value) this.msg = 'Valor é requerido';
  }

  ValidNumber() {
    const val = parseFloat(this.value);
    if (this.msg === '' && isNaN(val)) this.msg = 'Valor é requerido';
  }

  ValidDocument() {
    if (this.value.length == 11 && !cpf.isValid(this.value)) {
      this.msg = 'Documento Inválido';
    }

    if (this.value.length == 14 && !cnpj.isValid(this.value)) {
      this.msg = 'Documento Inválido';
    }
  }

  ValidZeroOrNegative() {
    const val = parseFloat(this.value);
    if ((this.msg === '' && val === 0) || val < 0 || isNaN(val)) this.msg = 'Valor Inválido';
  }
}

export default typeValid;
