import { Component } from '@angular/core';
import { NavComponent } from '../../shared/side-nav/side-nav.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { layoutMenu } from '../../core/models/layoutMenu.model';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-patrimony',
  standalone: true,
  imports: [NavComponent, NgxSkeletonLoaderModule, RouterOutlet, MenuBarComponent],
  templateUrl: './patrimony.component.html',
  styleUrl: './patrimony.component.scss'
})
export class PatrimonyComponent {

  public menuItens: layoutMenu[] = [];
  public colapse: number = 300;
  public personName: string = 'User';
  public reports: any[] = [ // Change the type from Array<any> to any[]
    {
      "id": 0,
      "name": "IPTU",
      "icon": "description",
    },
    {
      "id": 1,
      "name": "Fotovoltaica",
      "icon": "description",
    },
    {
      "id": 2,
      "name": "Energia",
      "icon": "description",
    },
    {
      "id": 3,
      "name": "Gás",
      "icon": "description",
    },
    {
      "id": 4,
      "name": "Conta de água",
      "icon": "description",
    },
    {
      "id": 5,
      "name": "Condomínio",
      "icon": "description",
    },
    {
      "id": 6,
      "name": "Imóveis próprios",
      "icon": "description",
    }
  ];
  constructor(private _httpClient: HttpClient, private _sanitizer: DomSanitizer) { }
  ngOnInit() {

    this.personName = localStorage.getItem('user.name')!;
    this._httpClient.get<layoutMenu[]>('assets/mock/menu.json').subscribe(data => {
      this.menuItens = data;
    });
  }
}
