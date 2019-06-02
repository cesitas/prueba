import { Component, Input } from '@angular/core';
import { FeedItemModel } from '../../models/feed.model';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'feed-item',
    templateUrl: 'feed-item.html'
})
export class FeedItemComponent {

    @Input() feedItem: FeedItemModel;

    constructor(public navCtrl: NavController) { }

    showItemDetails() {
        this.navCtrl.push('FeedDetailPage', { item: this.feedItem });
    }

}
