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
  public nameAcount: string = 'User';
  constructor(private ngZone: NgZone, private router: Router) { }

  ngOnInit(): void {
    this.tokenExpiration = localStorage.getItem('tokenExpiration')!;
    this.nameAcount = localStorage.getItem('nameAcount')!;
  }

  getInitials(getName:string){
    const name = getName.split(' ');
    const firstName = name[0];
    const lastName = name[name.length - 1];

    const firstLetterFirstName = firstName.charAt(0);
    const firstLetterLastName = lastName.charAt(0);

    return firstLetterFirstName + firstLetterLastName;
  }

  navigateTo(rout: string) {
    this.ngZone.run(() => this.router.navigate([rout]));
  }
}
