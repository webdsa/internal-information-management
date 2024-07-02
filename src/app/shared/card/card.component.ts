import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  constructor() {}

  @Input() title: string | undefined;
  @Input() info: string | undefined;
  @Input() hasPadding: boolean = false;
  @Input() overflowY: boolean = false;
  @Input() _style: string | undefined;
  @Input() _styleBody: string | undefined;

  ngOnInit(): void {}
}
