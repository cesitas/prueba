import { FeedItemComponent } from './feed-item/feed-item';
import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { FeedCardComponent } from './feed-card/feed-card';
@NgModule({
    declarations: [
        FeedItemComponent,
        FeedCardComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        FeedItemComponent,
        FeedCardComponent
    ]
})
export class ComponentsModule { }
