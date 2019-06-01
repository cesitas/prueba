import { Component } from '@angular/core';
import { FeedProvider } from '../../providers/feed/feed.provider';
import { IonicPage, NavController, Refresher } from 'ionic-angular';

@IonicPage()
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

    doRefresh(refresher: Refresher) {
        this.feedProvider.refreshFeed()
            .then(feedItems => {
                this.feedItems = feedItems != null ? feedItems : [];
                refresher.complete()
            }).catch(error => {
                console.error(error);
                refresher.complete()
            });
    }

}
