import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CardModule, FormsModule,PanelMenuModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  public text: string = 'Hello World';
  @Input() menuItens:MenuItem[] = [];;
  constructor() {}  
}
