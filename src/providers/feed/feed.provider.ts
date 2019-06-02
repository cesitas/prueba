import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { FeedItemModel, AuthorModel } from '../../models/feed.model';
import moment, { Moment } from 'moment';

@Injectable()
export class FeedProvider {

    private readonly feedStorageKey = 'StoredFeed';

    constructor(
        public http: HttpClient,
        public storage: Storage
    ) { }

    loadFeed(): Promise<FeedItemModel[]> {
        return new Promise<FeedItemModel[]>(resolve => {
            this.storage.get(this.feedStorageKey).then((items: FeedItemModel[]) => {
                if (items != null) {
                    let date1: Moment;
                    let date2: Moment;
                    items.sort((a, b) => {
                        date1 = moment(a.date);
                        date2 = moment(b.date);
                        if (date1.diff(date2) > 0) {
                            return -1;
                        } else if (date1.diff(date2) < 0) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                }
                resolve(items);
            });
        });
    }

    refreshFeed(): Promise<FeedItemModel[]> {
        return new Promise<FeedItemModel[]>(resolve => {
            this.http.get('http://www.rtve.es/api/noticias.json').toPromise().then(res => {
                const items: FeedItemModel[] = [];
                if (res != null && res['page'] != null) {
                    const page = res['page'];
                    let item: FeedItemModel;
                    for (let _item of page['items']) {
                        item = new FeedItemModel();
                        item.title = _item.title;
                        item.description = _item.summary;
                        item.url = _item.htmlUrl;
                        item.img = _item.image;
                        item.date = _item.modificationDate ? moment(_item.modificationDate, 'DD-MM-YYYY h:mm:ss').format() : null;
                        item.anteTitle = _item.anteTitle;
                        item.category = _item.mainCategory ? _item.mainCategory.replace(/\//g, ' >> ') : null;
                        item.text = _item.text;
                        if (_item.sign != null && _item.sign.name != null && _item.sign.photo != null) {
                            item.author = new AuthorModel();
                            item.author.name = _item.sign.name;
                            item.author.avatar = _item.sign.photo;
                        }
                        items.push(item);
                    }
                }
                let date1: Moment;
                let date2: Moment;
                items.sort((a, b) => {
                    date1 = moment(a.date);
                    date2 = moment(b.date);
                    if (date1.diff(date2) > 0) {
                        return -1;
                    } else if (date1.diff(date2) < 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                this.saveFeed(items);
                resolve(items);
            });
        });
    }

    private saveFeed(feed: FeedItemModel[]) {
        this.storage.set(this.feedStorageKey, feed);
    }

}
