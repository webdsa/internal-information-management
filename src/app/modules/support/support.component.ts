import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/card/card.component';
import { FormMsgErrorComponent } from '../../shared/form-msg-error/form-msg-error.component';
import { FormLabelComponent } from '../../shared/form-label/form-label.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatrimonyService } from '../patrimony/services/patrimony.services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule,MenuBarComponent,CardComponent,FormLabelComponent, FormMsgErrorComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent {
  protected form: WritableSignal<SupportModel> = signal(new SupportModel());
  #patrimonyService = inject(PatrimonyService);
  constructor(private _toast:ToastrService) { }
  send(){
    this.#patrimonyService.postSupport(this.form()).mutateAsync(null).then((res: any) => {
      if(res.succeeded){
        this._toast.success('Dúvida enviada com sucesso!', 'Sucesso');
      } else {
        this._toast.error('Já estamos trabalhando nessa correçäo.', 'Erro ao enviar dúvida!');
      }
    });
  }
}
export class SupportModel{
  name: string = '';
  email: string = '';
  message: string = '';
}