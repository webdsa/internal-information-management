import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { layoutMenu } from '../../core/models/layoutMenu.model';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patrimony',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule, RouterOutlet, MenuBarComponent],
  templateUrl: './patrimony.component.html',
  styleUrl: './patrimony.component.scss'
})
export class PatrimonyComponent {

  public menuItens: layoutMenu[] = [];

  public menuClick: boolean = false;
  public showProperty: boolean = false;
  public showResident: boolean = false;
  public showProvider: boolean = false;

  public colapse: number = 300;
  public personName: string = 'User';
  public services: any[] = [
    {
      "id": 0,
      "name": "Financeiro",
      "description": "Notas fiscais, faturas, preço do gás, conferência.",
      "icon": "attach_money",
      "rout": "financeiro"
    },
    {
      "id": 1,
      "name": "Rateios",
      "description": "Rateio de gás, PROTEGE, cortinas e pintura.",
      "icon": "call_split",
      "rout": "rateios"
    },
    {
      "id": 2,
      "name": "Garantias",
      "description": "Boiler das casas e bombs de poço.",
      "icon": "license",
      "rout": "garantias"
    },
    {
      "id": 3,
      "name": "Outros Serviços",
      "description": "Detetização, limpeza de cortinas, pinturas e mais.",
      "icon": "build",
      "rout": "outros-servicos"
    },
    {
      "id": 4,
      "name": "Preço do gás",
      "description": "Confira o valor atual do gás.",
      "icon": "propane_tank",
      "rout": "preco-gas"
    }
  ];
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
  constructor(private _httpClient: HttpClient, private _router: Router) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateComponentDisplay(event.urlAfterRedirects);
      }
    });
  }
  ngOnInit() {
    this.personName = localStorage.getItem('user.name')!;
    this._httpClient.get<layoutMenu[]>('assets/mock/menu.json').subscribe(data => {
      this.menuItens = data;
    });
  }

  navigateTo(route: string) {
    this._router.navigate(['patrimony/' + route]);
  }
  updateComponentDisplay(url: string) {
    this.showProperty = url.endsWith('/property') || url.endsWith('/new-property') || url.includes('/property/');
    this.showResident = url.endsWith('/resident') || url.endsWith('/new-resident') || url.endsWith('/resident/edit/');
    this.showProvider = url.endsWith('/provider') || url.endsWith('/new-provider');
  }
}
