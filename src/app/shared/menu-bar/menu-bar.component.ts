import { Component, ElementRef, Input, NgZone, OnInit, ViewChild, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { layoutMenu } from '../../core/models/layoutMenu.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/service/authService';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('childrenMenu') childrenMenuRef!: ElementRef;
  @ViewChild('Menu') menuRef!: ElementRef;

  @Input() haveMenuItens: boolean = true;

  #authService = inject(AuthService);
  public nameAccount: string | null = '';
  public menuItems: layoutMenu[] = [];
  public subMenu: layoutMenu[] = [];
  public selected: boolean = false;
  public open: boolean = false;
  protected showPermissionUser: boolean = false;

  constructor(private httpClient: HttpClient, private ngZone: NgZone, private router: Router) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.nameAccount = localStorage.getItem('user.name')?.toString() || '';
      if (this.nameAccount && this.nameAccount != '') {
        this.getInitials();
        this.getMenu();
      }
    }
    if (this.#authService.getUserPermissions() == 1) this.showPermissionUser = true;
  }

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', this.handleOutsideClick.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', this.handleOutsideClick.bind(this));
    }
  }

  clearLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
      location.reload();
    }
  }

  handleOutsideClick(event: MouseEvent): void {
    if (this.childrenMenuRef && !this.childrenMenuRef.nativeElement.contains(event.target) && this.menuRef && !this.menuRef.nativeElement.contains(event.target)) {
      this.subMenu = [];
    }
  }

  getInitials(): string {
    const name = this.nameAccount?.split('-').pop()?.trim() || '';
    const [firstName = '', lastName = ''] = name.split(' ');
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  }

  getMenu(): void {
    this.httpClient.get<layoutMenu[]>('assets/mock/menu.json').subscribe((data) => {
      this.menuItems = data;
    });
  }

  openSubMenu(id: number): void {
    const menuItem = this.menuItems.find((item) => item.id === id);
    this.subMenu = menuItem ? menuItem.items : [];
  }

  onMouseEnter(id: number): void {
    this.openSubMenu(id);
  }

  navigateTo(route: string): void {
    if (this.selected) {
      this.subMenu = [];
    }
    this.ngZone.run(() => this.router.navigate([route]));
  }
}
