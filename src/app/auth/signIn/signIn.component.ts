import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  NgZone,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalModule,
  MsalService,
} from '@azure/msal-angular';
import {
  AccountInfo,
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
  PopupRequest,
} from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { LocalStorageUtils } from '../../core/utils/local-storage.utils';

@Component({
  selector: 'app-signIn',
  standalone: true,
  imports: [CommonModule, MsalModule, RouterLink, RouterOutlet],
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.scss'],
  providers: [LocalStorageUtils],
})
export class SignInComponent implements OnInit {
  private readonly _destroying$ = new Subject<void>();

  public account: WritableSignal<AccountInfo | null> = signal(null);
  visibility = false;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private _msalGuardConfig: MsalGuardConfiguration,
    private _msalBroadcastService: MsalBroadcastService,
    private _authService: MsalService,
    private _cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router,
    private _localStorageUtils: LocalStorageUtils
  ) { }

  ngOnInit() {
    if (this.isLogged()) this.ngZone.run(() => this.router.navigate(['']));
    this._msalBroadcastService.msalSubject$.subscribe({
      next: (msalSubject) => {
        if (msalSubject.eventType === 'msal:acquireTokenFailure') {
          this.router.navigate(['/signIn']);
        }
      },
    });
    this._msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.account.set(this._authService.instance.getActiveAccount());

        this._cdr.detectChanges();
      });

    this._msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        )
      )
      .subscribe((msg: EventMessage) =>
        localStorage.setItem('tokenExpiration', (msg.payload as any).expiresOn)
      );


    this._msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this._authService.instance.setActiveAccount(payload.account);
      });
  }

  user = {
    email: '',
    password: '',
  };

  public isLogged(): boolean {
    return this._authService.instance.getActiveAccount() != null;
  }

  onSubmit() {
  }

  login() {
    if (this._msalGuardConfig.authRequest)
      this._authService.loginPopup({
        ...this._msalGuardConfig.authRequest,
      } as PopupRequest).subscribe((response: any) => {
        this._localStorageUtils.setUserName(response.account.name);
        this._authService.instance.setActiveAccount(response.account);
        this._localStorageUtils.setUserToken(response.account.idToken);
        this.ngZone.run(() => this.router.navigate(['']));
      });
    else this._authService.loginPopup();
  }
  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  toggleVisibility() {
    this.visibility = !this.visibility;
  }


}
