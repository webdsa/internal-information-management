import { Component, OnInit } from '@angular/core';
import { get } from 'http';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent implements OnInit {
  public nameAcount: string = 'User';
  ngOnInit(): void {
    this.nameAcount = localStorage.getItem('user.name')!;
    this.getInitials();
  }
  getInitials() {
    const firstName = this.nameAcount[0];
    const lastName = this.nameAcount[this.nameAcount.length - 1];

    const firstLetterFirstName = firstName.charAt(0);
    const firstLetterLastName = lastName.charAt(0);

    return firstLetterFirstName + firstLetterLastName;
  }
}
