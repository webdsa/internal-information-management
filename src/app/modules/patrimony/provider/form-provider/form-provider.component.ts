import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { HeaderTitleComponent } from '../../../../shared/header-title/header-title.component';
import { CardComponent } from '../../../../shared/card/card.component';
import { FormLabelComponent } from '../../../../shared/form-label/form-label.component';
import { FormMsgErrorComponent } from '../../../../shared/form-msg-error/form-msg-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsertProvider } from '../../../../core/models/insert.provider';
import { PatrimonyService } from '../../services/patrimony.services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-provider',
  standalone: true,
  imports: [CommonModule, HeaderTitleComponent, CardComponent, FormLabelComponent, FormMsgErrorComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './form-provider.component.html',
  styleUrl: './form-provider.component.scss'
})
export class FormProviderComponent {
  public form: InsertProvider = new InsertProvider();

  @Input() provider: InsertProvider = new InsertProvider();
  @Input() edit: boolean = false;

  @Output() onEdited: EventEmitter<boolean> = new EventEmitter<boolean>();
  #patrimonyService = inject(PatrimonyService);
  constructor(private _toast: ToastrService, private _router: Router) { }

  ngOnInit(): void {
    if (this.provider && Object.keys(this.provider).length > 0) {
      this.form = this.provider ?? new InsertProvider();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.checkChanges(changes, 'provider')) {
      this.form = this.provider ?? new InsertProvider();
    }
  }

  checkChanges(changes: SimpleChanges, values: string): boolean {
    return changes[values] && changes[values]?.previousValue != changes[values]?.previousValue;
  }

  public saveProvider() {
    this.#patrimonyService.postProvider(this.form).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this._toast.success('Fornecedor cadastrado com sucesso!');
        this.form = new InsertProvider();
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao cadastrar Fornecedor!');
      }
    });
  }
  public updateProvider() {
    this.#patrimonyService.updateProvider(this.form).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this._toast.success('Fornecedor atualizado com sucesso!');
        this.form = new InsertProvider();
        this.onEdited.emit(true);
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao atualizar Fornecedor!');
      }
    });
  }
  cancel() {
    this.form = new InsertProvider();
  }
  public navigateTo(path: string) {
    this._router.navigate(['patrimony/' + path]);
  }
}
