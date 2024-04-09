import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MsalService } from '@azure/msal-angular';


@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CardModule, FormsModule,PanelMenuModule,NgOptimizedImage,CommonModule,RouterLink],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class NavComponent {
  public retract: boolean = false;
  @Input() menuItens:any[] = [];
  @Output() colapseMenu: EventEmitter<number> = new EventEmitter();
  constructor(private _authService:MsalService, private ngZone: NgZone, private router: Router) {}  

  logout() {
    this._authService.logout();
    this.ngZone.run(() => this.router.navigate(['signIn']));
  }
}
