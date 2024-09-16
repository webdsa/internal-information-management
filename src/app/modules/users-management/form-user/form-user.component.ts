import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent {
  user = input.required();
  onChange = output<boolean>();
  ngOnInit() {
    console.log('Componente cargado');
  }

  updateUser() {}

  cancel() {
    this.onChange.emit(true);
  }
}
