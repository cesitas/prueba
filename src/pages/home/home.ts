import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FeedProvider } from '../../providers/feed/feed.provider';
import { FeedItemModel } from '../../models/feed.model';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    feedItems = [];

    constructor(
        public navCtrl: NavController,
        private feedProvider: FeedProvider
    ) {
        this.feedProvider.loadFeed().then(feedItems => this.feedItems = feedItems != null ? feedItems : []);
    }

    test() {
        this.feedProvider.refreshFeed().then(feedItems => this.feedItems = feedItems != null ? feedItems : []);
    }

    showItemDetails(item: FeedItemModel) {
        this.navCtrl.push('FeedDetailPage', { item });
    }

}
