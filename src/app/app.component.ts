import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MenuItem } from 'primeng/api';
import { HttpClient, HttpClientModule  } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent,NgxSkeletonLoaderModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'patrimony-management';
  public menuItens:MenuItem[] = [];
  constructor(private _httpClient: HttpClient) { }
  ngOnInit() {
    this._httpClient.get<MenuItem[]>('assets/mock/menu.json').subscribe(data => {
      this.menuItens = data;
    });
  }
}
