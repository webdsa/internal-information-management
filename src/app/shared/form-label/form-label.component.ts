import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-label.component.html',
  styleUrls: ['./form-label.component.scss']
})
export class FormLabelComponent {
  @Input() required: boolean | undefined;
  @Input() titleLabel: any = '';
  ngOnInit(): void {
    if (this.required === undefined) {
      this.required = false;
    }

  }
}
