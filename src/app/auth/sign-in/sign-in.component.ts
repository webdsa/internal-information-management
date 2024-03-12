import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private _msalService :MsalService ) { }

  ngOnInit() {
    this._msalService.instance.handleRedirectPromise().then( res => {
      if (res != null && res.account != null) {
        this._msalService.instance.setActiveAccount(res.account)
      }
    })
  }

  user = {
    email: '',
    password: ''
  };

  onSubmit() {
    console.log('Formulário enviado:', this.user);
  }

  public login() {
    // this._msalService.loginRedirect();

    this._msalService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this._msalService.instance.setActiveAccount(response.account);
      });
  }

  public logout() {
    this._msalService.logout()
  }
}
