import { Component } from '@angular/core';
import { NavComponent } from '../../shared/side-nav/side-nav.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Router, RouterOutlet } from '@angular/router';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';
import { HttpClient } from '@angular/common/http';
import { InternalService } from './services/internal.service';

@Component({
  selector: 'app-internal-information',
  standalone: true,
  imports: [MenuBarComponent, NgxSkeletonLoaderModule, RouterOutlet],
  templateUrl: './internal-information.component.html',
  styleUrl: './internal-information.component.scss'
})
export class InternalInformationComponent {
  public colapse: number = 300;

  constructor(private _internalService: InternalService) { }

  ngOnInit(): void {
    this._internalService.getAllGuide();

  }
}
