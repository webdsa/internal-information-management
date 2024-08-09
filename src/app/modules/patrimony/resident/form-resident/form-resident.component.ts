import { CommonModule } from '@angular/common';
import { Component, Input, computed, inject } from '@angular/core';
import { HeaderTitleComponent } from '../../../../shared/header-title/header-title.component';
import { CardComponent } from '../../../../shared/card/card.component';
import { FormLabelComponent } from '../../../../shared/form-label/form-label.component';
import { FormMsgErrorComponent } from '../../../../shared/form-msg-error/form-msg-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsertResident, ResidentSpouse } from '../../../../core/models/insert-resident.model';
import { PatrimonyService } from '../../services/patrimony.services';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ToastrService } from 'ngx-toastr';
import { Residents } from '../../../../core/models/property.model';


@Component({
  selector: 'app-form-resident',
  standalone: true,
  templateUrl: './form-resident.component.html',
  styleUrl: './form-resident.component.scss',
  imports: [CommonModule, HeaderTitleComponent, FormLabelComponent, FormMsgErrorComponent, FormsModule, ReactiveFormsModule, CardComponent, DropdownModule]
})
export class FormResidentComponent {
  #patrimonyService = inject(PatrimonyService);

  public form: InsertResident = new InsertResident();
  public spouse: ResidentSpouse = new ResidentSpouse();
  public retractInfo: boolean = true;
  protected edit: boolean = false;
  protected propertyId: number = 0;

  protected colaboratorNames = computed(() => {
    const colaborators: any[] = [];
    this.#patrimonyService.getColaborators().result$.subscribe({
      next: (res: any) => {
        if (res && res.data && Array.isArray(res.data.data)) {
          res.data.data.map((colaborator: any) => {
            colaborators.push({
              value: colaborator.id,
              label: colaborator.employeeName
            });
          });
        } else {
          return;
        }
      },
      error: (err) => {
        this._toast.error('Erro ao consultar colaboradores:', err);
      }
    });


    colaborators.unshift({ value: 0, label: 'Selecione um colaborador' });
    return colaborators;
  });

  protected properties = computed(() => {
    const properties: any[] = [];
    this.#patrimonyService.getProperty().result$.subscribe({
      next: (res: any) => {
        if (res && res.data && Array.isArray(res.data.data)) {
          res.data.data.map((property: any) => {
            if (property.status === 1) {
            properties.push({
              value: property.id,
              label: property.propertyName + (property?.complement ? ', ' + property.complement : '')
            });
          }
          });
        } else {
          return;
        }
      },
      error: (err) => {
        this._toast.error('Erro ao consultar moradias:', err);
      }
    });


    properties.unshift({ value: 0, label: 'Selecione um imóvel' });
    return properties;
  });


  selectedColaborator: any;
  selectedProperty: any;

  // @Input() edit: boolean = false;
  constructor(private _router: Router, private _toast: ToastrService,private _activatedRoute:ActivatedRoute) {
    this._activatedRoute.url.subscribe(segments => {
      const fullPath = segments.join('/');
      this.edit = fullPath.endsWith('/edit')??false; 
      if (this.edit) {
        this._activatedRoute.paramMap.subscribe(params => {
          this.propertyId = Number(params.get('id'));
        });
      } else {
        this.propertyId = 0;
      }
    });
  }

  ngOnInit(): void {
    if (this.edit) {
      this.#patrimonyService.currResidents.subscribe((res: Residents) => {
        this.form.propertyId = this.propertyId;
        this.form.collaboratorId = res.collaborator.id;
        this.form.entryAt = res.entryAt;
        this.form.departureAt = res.departureAt;
        this.form.spouse = res.spouse;
      });
    }else{
      this.form = new InsertResident();
    }
  }

  selectProperty(event: any) {
    this.form.propertyId = Number(event.value);
  }

  cancel() {
    this.form = new InsertResident();
  }

  saveResident() {
    this.form.propertyId = Number(this.selectedProperty);
    this.form.collaboratorId = Number(this.selectedColaborator);
    this.form.entryAt = new Date(this.form.entryAt);
    this.form.departureAt = new Date(this.form.departureAt);

    this.#patrimonyService.postColaborator(this.form).mutateAsync(null).then((res: any) => {
      if (res.succeeded) {
        this._toast.success('Colaborador linkado com sucesso!');
        this.form = new InsertResident();
        this._router.navigate(['patrimony/resident']);
      } else {
        this._toast.error('Procure a equipe de suporte.', 'Erro ao linkar Colaborador!');
      }
    });
  }

  updateResident() {
    this._toast.error('Procure a equipe de suporte.', 'Rota ainda näo implementada!');
    // this.#patrimonyService.updateColabo
  }
}
