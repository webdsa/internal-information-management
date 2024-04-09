import { Component } from '@angular/core';
import { NavComponent } from '../../shared/side-nav/side-nav.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { layoutMenu } from '../../core/models/layoutMenu.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patrimony',
  standalone: true,
  imports: [NavComponent,NgxSkeletonLoaderModule],
  templateUrl: './patrimony.component.html',
  styleUrl: './patrimony.component.scss'
})
export class PatrimonyComponent {

  public menuItens:layoutMenu[] = [];
  
  constructor(private _httpClient: HttpClient) {   }
  ngOnInit() {
    
    this._httpClient.get<layoutMenu[]>('assets/mock/menu.json').subscribe(data => {
      this.menuItens = data;
    });
  }
}
