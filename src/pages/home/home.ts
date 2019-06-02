import { Component } from '@angular/core';
import { FeedProvider } from '../../providers/feed/feed.provider';
import { IonicPage, NavController, PopoverController, Refresher, ToastController } from 'ionic-angular';
import { ListViewOptionsEnum } from '../../enums/list-view-options.enum';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    feedItems = [];

    viewOption = ListViewOptionsEnum.list;

    constructor(
        public navCtrl: NavController,
        private feedProvider: FeedProvider,
        private popoverCtrl: PopoverController,
        private toastController: ToastController
    ) {
        this.feedProvider.loadFeed().then(feedItems => this.feedItems = feedItems != null ? feedItems : []);
    }

    doRefresh(refresher: Refresher) {
        this.feedProvider.refreshFeed()
            .then(feedItems => {
                this.feedItems = feedItems != null ? feedItems : [];
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

}
