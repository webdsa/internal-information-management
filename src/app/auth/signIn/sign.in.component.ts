
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, NgZone, OnInit, WritableSignal, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalModule, MsalService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult, EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signIn',
  standalone: true,
  imports: [
    CommonModule,
    MsalModule,
    RouterLink,
    RouterOutlet],
  templateUrl: './sign.in.component.html',
  styleUrls: ['./sign.in.component.scss']
})
export class SignInComponent implements OnInit {
  private readonly _destroying$ = new Subject<void>();

  public account: WritableSignal<AccountInfo | null> = signal(null);

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private _msalGuardConfig: MsalGuardConfiguration,
    private _msalBroadcastService: MsalBroadcastService,
    private _authService: MsalService,
    private _cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  ngOnInit() {
    if(this.isLogged()) this.ngZone.run(() => this.router.navigate(['']));
    this._msalBroadcastService
      .inProgress$
      .pipe(
        filter((status: InteractionStatus) =>
          status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.account.set(
          this._authService.instance.getActiveAccount()
        );

        this._cdr.detectChanges();
      });

    this._msalBroadcastService
      .msalSubject$
      .pipe(
        filter((msg: EventMessage) =>
          msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        )
      )
      .subscribe((msg: EventMessage) =>
        localStorage.setItem('tokenExpiration', (msg.payload as any).expiresOn)
      );

    this._msalBroadcastService
      .msalSubject$
      .pipe(
        filter((msg: EventMessage) =>
          msg.eventType === EventType.LOGIN_SUCCESS
        )
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this._authService.instance.setActiveAccount(payload.account);
      });

  }

  user = {
    email: '',
    password: ''
  };

  public isLogged(): boolean {
    return this._authService.instance.getActiveAccount() != null;
  }

  onSubmit() {
    console.log('Formulário enviado:', this.user);
  }

  login() {
    debugger;
    if (this._msalGuardConfig.authRequest)
      this._authService.loginRedirect(
        { ...this._msalGuardConfig.authRequest } as RedirectRequest
      );
    else
      this._authService.loginRedirect();
  }
  logout() {
    this._authService.logoutRedirect();
  }
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
}
}
