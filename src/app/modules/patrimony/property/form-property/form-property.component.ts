import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderTitleComponent } from '../../../../shared/header-title/header-title.component';
import { CardComponent } from '../../../../shared/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLabelComponent } from '../../../../shared/form-label/form-label.component';
import { FormMsgErrorComponent } from '../../../../shared/form-msg-error/form-msg-error.component';
import { RealtyFormModel } from '../../../../core/models/realtyForm.model';

@Component({
  selector: 'app-form-property',
  standalone: true,
  imports: [CommonModule,HeaderTitleComponent,CardComponent,FormLabelComponent,FormMsgErrorComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './form-property.component.html',
  styleUrl: './form-property.component.scss'
})
export class FormPropertyComponent {
  public form: RealtyFormModel = new RealtyFormModel();
  public retractInfo:boolean = true;
}
