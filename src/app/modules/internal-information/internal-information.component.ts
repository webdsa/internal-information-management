import { Component, NgZone } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { InternalService } from './services/internal.service';
import { FormsModule } from '@angular/forms';
import { NewTopicComponent } from './components/new-topic/new-topic.component';

@Component({
  selector: 'app-internal-information',
  standalone: true,
  imports: [MenuBarComponent, NgxSkeletonLoaderModule, RouterOutlet, FormsModule, NewTopicComponent],
  templateUrl: './internal-information.component.html',
  styleUrl: './internal-information.component.scss'
})
export class InternalInformationComponent {
  public colapse: number = 300;
  public allGuids: any = [];
  public subTitle: string = "Informações Internas";
  public txtArea: string = "Selecione um guia para visualizar as informações internas";
  public showGuids: boolean = false;
  public openModal: boolean = false;

  constructor(private _internalService: InternalService, private ngZone: NgZone, private _router: Router) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateComponentDisplay(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {

  }

  public selectedInput(event: any) {
    console.log(event)
  }
  public navigateTo(rout: string) {
    this.ngZone.run(() => this._router.navigate([rout]));
  }
  updateComponentDisplay(url: string) {
    this.showGuids = url.endsWith('/guids');
  }
}
