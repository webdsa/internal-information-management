import { Component } from '@angular/core';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';

@Component({
  selector: 'app-no-permission',
  standalone: true,
  imports: [MenuBarComponent],
  templateUrl: './no-permission.component.html',
  styleUrl: './no-permission.component.scss'
})
export class NoPermissionComponent {

}
