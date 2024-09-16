import { Component, inject, signal } from '@angular/core';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/service/authService';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/card/card.component';
import { SearchComponent } from '../../shared/search/search.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { UsersService } from './services/users.service';
import { FormUserComponent } from './form-user/form-user.component';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [MenuBarComponent, NgxSkeletonLoaderModule, RouterOutlet, FormsModule, CommonModule, CardComponent, SearchComponent, ModalComponent, FormUserComponent],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss'
})
export class UsersManagementComponent {
  #authService = inject(AuthService);
  #usersService = inject(UsersService);

  protected users = signal<Array<any>>([]);
  protected usersBk = signal<Array<any>>([]);
  protected userSelected: any;
  protected openModalEdit: boolean = false;
  listSelected: any;

  ngOnInit(): void {
    // console.log('teste', this.#authService.getUserPermissions());

    this.getUsers();
  }

  getUsers() {
    this.#usersService.getAllUsers().result$.subscribe((response: any) => {
      this.users.set(response.data.data);
      this.usersBk.set(response.data.data);
    });
  }

  searchByName(search: string) {
    if (search != '') {
      search = this.noAccents(search);
      this.users.set(
        this.usersBk().filter((x) => this.noAccents(x.codeAPS).includes(search) || this.noAccents(x.employeeName.toString().toUpperCase()).includes(search) || this.noAccents(x.email.toString().toUpperCase()).includes(search))
      );
    } else this.users.set(this.usersBk());
  }

  noAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  selectAll() {
    this.listSelected;
  }
}
