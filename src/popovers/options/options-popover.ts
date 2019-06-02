import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-options-popover',
    templateUrl: 'options-popover.html',
})
export class OptionsPopover {

    options: Array<{ description: string, value: any }>

    constructor(
        public navParams: NavParams,
        public viewCtrl: ViewController
    ) {
        this.options = this.navParams.get("options");
    }

    selectOption(value: string) {
        this.viewCtrl.dismiss(value);
    }

}
