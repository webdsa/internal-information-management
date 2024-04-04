import { Component } from '@angular/core';
import { NavComponent } from "../../../shared/side-nav/side-nav.component";

@Component({
    selector: 'app-property',
    standalone: true,
    templateUrl: './property.component.html',
    styleUrl: './property.component.scss',
    imports: [NavComponent]
})
export class PropertyComponent {

}
