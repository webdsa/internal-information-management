import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CardModule, FormsModule,PanelMenuModule,NgOptimizedImage,CommonModule,RouterLink],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class NavComponent {
  public text: string = 'Hello World';
  public retract: boolean = false;
  @Input() menuItens:any[] = [];
  constructor() {}  
}
