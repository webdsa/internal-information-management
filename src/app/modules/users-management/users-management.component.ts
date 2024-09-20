import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/service/authService';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/card/card.component';
import { SearchComponent } from '../../shared/search/search.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { UsersService } from './services/users.service';
import { FormUserComponent } from './form-user/form-user.component';
import { UserModel } from '../../core/models/user.model';
import { RoleTranslationPipe } from './pipes/user.pipe';
import { RoleTypeEnumTranslation } from '../../core/enums/role-type.enum';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [CommonModule, MenuBarComponent, NgxSkeletonLoaderModule, RouterOutlet, FormsModule, CardComponent, SearchComponent, ModalComponent, FormUserComponent, RoleTranslationPipe],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss'
})
export class UsersManagementComponent {
  #usersService = inject(UsersService);
  #authService = inject(AuthService);
  #router = inject(Router);

  protected users = signal<Array<UserModel>>([]);
  protected usersBk = signal<Array<UserModel>>([]);
  protected userSelected: WritableSignal<UserModel> = signal(new UserModel());
  protected openModalEdit: boolean = false;
  protected RoleTypeEnumTranslation = RoleTypeEnumTranslation;
  listSelected: any;

  ngOnInit(): void {
    if (this.#authService.getUserPermissions() != 1) this.#router.navigate(['/no-permissions']);
    this.getUsers();
  }

  getUsers() {
    this.#usersService.getAllUsers().result$.subscribe((response: any) => {
      if (response.data.data != undefined) {
        this.users.set(response.data.data);
        this.usersBk.set(response.data.data);
      }
    });
  }

  searchByName(search: string) {
    if (search != '') {
      search = this.noAccents(search).toLocaleLowerCase();
      this.users.set(this.usersBk().filter((x) => this.noAccents(x.userName.toString().toLocaleLowerCase()).includes(search) || this.noAccents(x.userEmail.toString().toLocaleLowerCase()).includes(search)));
    } else this.users.set(this.usersBk());
  }

  noAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  selectAll() {
    this.listSelected;
  }

  editUser(user: any) {
    this.openModalEdit = true;
    this.userSelected.set(user);
  }
}
