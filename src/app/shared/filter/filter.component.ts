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
  showFilter: boolean = false;
  TypeEnum: any[] = Object.values(TypePropertyEnum);
  StatusEnum: any[] = Object.values(StatusPropertyEnum);

  @Output() typeSelected = new EventEmitter<string>();
  @Output() statusSelected = new EventEmitter<string>();

  onTypeChange(type: any) {
    this.typeSelected.emit(type.value);
  }

  onStatusChange(status: any) {
    this.statusSelected.emit(status.value);
  }

  ngOnInit() {
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }
}

