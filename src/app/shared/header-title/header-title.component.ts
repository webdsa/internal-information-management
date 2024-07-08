import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-title.component.html',
  styleUrl: './header-title.component.scss'
})
export class HeaderTitleComponent {
  @Input() title: string = 'Adicionar novo';
  @Input() description!: string;
  @Input() titleEmphasis!: string;
  @Input() color!: string;
  @Input() colorLight!: string;
  @Input() icon: string = 'visibility';
  @Input() textBtn!: string;
  @Input() router!: string;
  constructor(private _router: Router) { }

  public navigateTo(path: string) {
    this._router.navigate([this.router]);
  }
}
