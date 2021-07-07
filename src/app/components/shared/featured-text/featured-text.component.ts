import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-featured-text',
  templateUrl: './featured-text.component.html',
  styleUrls: ['./featured-text.component.scss'],
})
export class FeaturedTextComponent {

  @Input() color: string = 'primary';

  constructor() { }

}
