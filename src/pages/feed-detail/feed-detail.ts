import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedItemModel } from '../../models/feed.model';

@IonicPage()
@Component({
    selector: 'page-feed-detail',
    templateUrl: 'feed-detail.html',
})
export class FeedDetailPage {

    feedItem: FeedItemModel;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams
    ) {
        this.feedItem = this.navParams.get('item');
    }

    openOnBrowser() {
        window.open(this.feedItem.url, '_system', 'location=yes')
    }

}
