import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('childrenMenu') childrenMenuRef!: ElementRef;
  @ViewChild('Menu') MenuRef!: ElementRef;
  constructor(private _httpClient: HttpClient, private ngZone: NgZone, private router: Router) { }
  public nameAcount: string = 'User';
  public menuItens: layoutMenu[] = [];
  public subMenu: layoutMenu[] = [];
  public selected: boolean = false;

  @Input() haveMenuItens: boolean = true;

  ngOnInit(): void {
    this.nameAcount = localStorage.getItem('user.name')!;
    this.getInitials();
    this.getMenu();
  }

  ngAfterViewInit() {
    document.addEventListener('click', this.handleOutsideClick.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
  }

  clearLocalStorage(){
    localStorage.clear();
    location.reload();
  }

  handleOutsideClick(event: MouseEvent) {
    if (this.childrenMenuRef && !this.childrenMenuRef.nativeElement.contains(event.target) && this.MenuRef && !this.MenuRef.nativeElement.contains(event.target)) {
      this.subMenu = [];
    }
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
    if (this.selected) this.subMenu = [];
    this.ngZone.run(() => this.router.navigate([rout]));
  }
}
