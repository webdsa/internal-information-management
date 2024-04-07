import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GraphProfile } from '../../core/models/graph-profile.type';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  profile?: GraphProfile;
  tokenExpiration!: string;

  constructor(
      private _http: HttpClient
  ) { }
  ngOnInit(): void {
    this._http
    .get<GraphProfile>('https://graph.microsoft.com/v1.0/me')
    .subscribe((profile: GraphProfile) => this.profile = profile);

this.tokenExpiration = localStorage.getItem('tokenExpiration')!;
  }

}
