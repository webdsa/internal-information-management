import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { StatusPropertyEnum } from '../../core/enums/statusPropertyEnum.enum';
import { TypePropertyEnum } from '../../core/enums/typePropertyEnum.enum';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  public showFilter: boolean = false;
  public TypeEnum: any[] = Object.values(TypePropertyEnum);
  public StatusEnum: any[] = Object.values(StatusPropertyEnum);
  public selectedType: any = 'Todos';
  public selectedStatus: any = 'Todos';

  @Output() ApplyFilter = new EventEmitter<any>();

  onTypeChange(type: any) {
    this.selectedType = type.value;
  }

  onStatusChange(status: any) {
    this.selectedStatus = status.value;
  }

  ngOnInit() {
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }
  applyFilter(){
    this.showFilter = false;
    const filter = { 
      type: this.selectedType,
      status: this.selectedStatus
     };
     this.ApplyFilter.emit(filter);
  }
}

