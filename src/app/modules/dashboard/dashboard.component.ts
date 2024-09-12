import { Component, inject, NgZone, OnInit } from '@angular/core';
import { GraphProfile } from '../../core/models/graph-profile.type';
import { Router } from '@angular/router';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { AuthService } from '../../auth/service/authService';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenuBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  profile?: GraphProfile;
  tokenExpiration!: string;
  public nameAcount: string = 'User';
  #authService = inject(AuthService);

  constructor(private ngZone: NgZone, private router: Router) { }

  ngOnInit(): void {
    this.tokenExpiration = localStorage.getItem('tokenExpiration')!;
    this.nameAcount = localStorage.getItem('user.name')!;
  }

  navigateTo(rout: string) {
    this.ngZone.run(() => this.router.navigate([rout]));
  }

  // this._http.get<GraphProfile>('https://graph.microsoft.com/v1.0/me').subscribe((profile: GraphProfile) => this.profile = profile);
}
