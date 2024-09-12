import { Component, inject } from '@angular/core';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/service/authService';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [MenuBarComponent, NgxSkeletonLoaderModule, RouterOutlet, FormsModule],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss'
})
export class UsersManagementComponent {
  #authService = inject(AuthService);

  ngOnInit(): void {
    console.log('teste',this.#authService.getUserPermissions());
  }
}
