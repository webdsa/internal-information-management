import { Component } from '@angular/core';
import { HeaderTitleComponent } from '../../../shared/header-title/header-title.component';
import { CardComponent } from '../../../shared/card/card.component';
import { CommonModule } from '@angular/common';
import { FormLabelComponent } from '../../../shared/form-label/form-label.component';
import { FormMsgErrorComponent } from '../../../shared/form-msg-error/form-msg-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RealtyFormModel } from '../../../core/models/realtyForm.model';

@Component({
  selector: 'app-realty',
  standalone: true,
  imports: [HeaderTitleComponent,CardComponent,CommonModule,FormLabelComponent,FormMsgErrorComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './realty.component.html',
  styleUrl: './realty.component.scss'
})
export class RealtyComponent {
  public form: RealtyFormModel = new RealtyFormModel();
}
