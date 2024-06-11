import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { layoutMenu } from '../../core/models/layoutMenu.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent implements OnInit {
  constructor(private _httpClient: HttpClient, private ngZone: NgZone, private router: Router) { }
  public nameAcount: string = 'User';
  public menuItens: layoutMenu[] = [];
  public subMenu: layoutMenu[] = [];

  @Input() haveMenuItens: boolean = true;

  ngOnInit(): void {
    this.nameAcount = localStorage.getItem('user.name')!;
    this.getInitials();
    this.getMenu();
  }
  getInitials() {
    const firstName = this.nameAcount[0];
    const lastName = this.nameAcount[this.nameAcount.length - 1];

    const firstLetterFirstName = firstName.charAt(0);
    const firstLetterLastName = lastName.charAt(0);

    return firstLetterFirstName + firstLetterLastName;
  }
  getMenu() {
    this._httpClient.get<layoutMenu[]>('assets/mock/menu.json').subscribe(data => {
      this.menuItens = data;
    });
  }
  openSubMenu(id: number) {
    this.subMenu = this.menuItens.find(x => x.id === id)!.items;
  }
  navigateTo(rout: string) {
    this.ngZone.run(() => this.router.navigate([rout]));
  }
}
