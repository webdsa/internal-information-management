import { Component } from '@angular/core';
import { NavComponent } from '../../../shared/side-nav/side-nav.component';
import { CardComponent } from '../../../shared/card/card.component';

@Component({
    selector: 'app-property',
    standalone: true,
    templateUrl: './property.component.html',
    styleUrl: './property.component.scss',
    imports: [NavComponent, CardComponent]
})
export class PropertyComponent {

}
