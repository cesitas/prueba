import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OptionsPopover } from './options-popover';

@NgModule({
    declarations: [
        OptionsPopover,
    ],
    imports: [
        IonicPageModule.forChild(OptionsPopover),
    ],
})
export class OptionsPageModule { }
