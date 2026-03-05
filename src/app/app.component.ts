import { Component } from '@angular/core';
import { layoutMenu } from './core/models/layoutMenu.model';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'patrimony-management';
  public menuItens:layoutMenu[] = [];
  
  constructor() {}
  ngOnInit() {}
}

