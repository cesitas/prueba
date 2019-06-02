import { Component } from '@angular/core';
import { FeedProvider } from '../../providers/feed/feed.provider';
import { IonicPage, NavController, PopoverController, Refresher, ToastController } from 'ionic-angular';
import { ListViewOptionsEnum } from '../../enums/list-view-options.enum';
import { FeedItemModel } from '../../models/feed.model';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    shownItems: FeedItemModel[] = [];

    viewOption = ListViewOptionsEnum.list;

    isSearching = false;

    private feedItems: FeedItemModel[] = [];

    constructor(
        public navCtrl: NavController,
        private feedProvider: FeedProvider,
        private popoverCtrl: PopoverController,
        private toastController: ToastController
    ) {
        this.feedProvider.loadFeed().then(feedItems => {
            this.feedItems = feedItems != null ? feedItems : []
            this.shownItems = this.feedItems;
        });
    }

    doRefresh(refresher: Refresher) {
        this.feedProvider.refreshFeed()
            .then(feedItems => {
                this.feedItems = feedItems != null ? feedItems : [];
                this.shownItems = this.feedItems;
                refresher.complete();
            }).catch(() => {
                refresher.complete();
                this.toastController.create({ message: 'No se pudo actualizar. Vuelve a intentarlo más tarde', duration: 3000 }).present();
            });
    }

    showMoreOptions(event: any) {
        const options: Array<{ description: string, value: ListViewOptionsEnum }> = [];
        options.push({ description: 'Ver lista', value: ListViewOptionsEnum.list });
        options.push({ description: 'Ver tarjetas', value: ListViewOptionsEnum.cards });
        const popover = this.popoverCtrl.create('OptionsPopover', { options });
        popover.onDidDismiss(selectedView => {
            if (selectedView != null) {
                this.viewOption = selectedView;
            }
        });
        popover.present({
            ev: event
        });
    }

    switchFilter() {
        this.isSearching = !this.isSearching;
        if (this.isSearching != true) {
            this.shownItems = this.feedItems;
        }
    }

    filterItems(event: any) {
        const value = event.target.value;
        if (value && value.trim() !== '') {
            this.shownItems = this.feedItems.filter(feedItem => {
                return (feedItem.title != null && feedItem.title.toLowerCase().includes(value.toLowerCase()))
                    || (feedItem.anteTitle != null && feedItem.anteTitle.toLowerCase().includes(value.toLowerCase()));
            });
        } else {
            this.shownItems = this.feedItems;
        }
    }

}
