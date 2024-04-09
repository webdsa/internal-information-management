import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { layoutMenu } from './core/models/layoutMenu.model';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'patrimony-management';
  public menuItens:layoutMenu[] = [];
  
  constructor() {}
  ngOnInit() {}
}

