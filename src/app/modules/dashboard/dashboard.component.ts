import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { GraphProfile } from '../../core/models/graph-profile.type';
import { Router } from '@angular/router';

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
  public userName:string = 'User';
  constructor(private ngZone: NgZone,private router: Router) { }
  ngOnInit(): void {
    this.tokenExpiration = localStorage.getItem('tokenExpiration')!;
  }
  navigateTo(rout:string){
    this.ngZone.run(() => this.router.navigate([rout]));
  }
}
