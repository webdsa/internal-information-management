import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  user = {
    email: '',
    password: ''
  };

  onSubmit() {
    console.log('Formulário enviado:', this.user);
  }

}
