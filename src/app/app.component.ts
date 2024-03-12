import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { layoutMenu } from './core/models/layoutMenu.model';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './side-nav/side-nav.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MsalService } from '@azure/msal-angular';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent,NgxSkeletonLoaderModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'patrimony-management';
  public menuItens:layoutMenu[] = [];
  
  constructor(private _httpClient: HttpClient, private _msalService : MsalService) {   }
  ngOnInit() {
    
    this._httpClient.get<layoutMenu[]>('assets/mock/menu.json').subscribe(data => {
      this.menuItens = data;
    });
  }
  public isLogged(): boolean {
    return this._msalService.instance.getActiveAccount() != null;
  }
}

