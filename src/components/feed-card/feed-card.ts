import { Component, Input } from '@angular/core';
import { FeedItemModel } from '../../models/feed.model';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'feed-card',
    templateUrl: 'feed-card.html'
})
export class FeedCardComponent {

    @Input() feedItem: FeedItemModel;

    constructor(public navCtrl: NavController) { }

    showItemDetails() {
        this.navCtrl.push('FeedDetailPage', { item: this.feedItem });
    }

}
