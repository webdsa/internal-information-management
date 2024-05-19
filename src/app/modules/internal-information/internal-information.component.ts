import { Component } from '@angular/core';
import { NavComponent } from '../../shared/side-nav/side-nav.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-internal-information',
  standalone: true,
  imports: [NavComponent,NgxSkeletonLoaderModule,RouterOutlet],
  templateUrl: './internal-information.component.html',
  styleUrl: './internal-information.component.scss'
})
export class InternalInformationComponent {
  public colapse:number = 300;
}
