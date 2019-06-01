import { Component } from '@angular/core';

/**
 * Generated class for the FeedItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'feed-item',
  templateUrl: 'feed-item.html'
})
export class FeedItemComponent {

  text: string;

  constructor() {
    console.log('Hello FeedItemComponent Component');
    this.text = 'Hello World';
  }

}
