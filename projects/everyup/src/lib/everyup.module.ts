import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CapitalizePipe} from './pipes/strings/capitalize.pipe';
import {BackgroundUrlPipe} from './pipes/strings/background.url.pipe';
import {FromNumberToArrayPipe} from '@everyup/pipes/numbers/as.array.pipe';
import {PreventBubblingDirective} from '@everyup/directives/preventBubbling';
import {InvalidControlCheckDirective} from '@everyup/directives/forms/invalidControlCheck';
import {ButtonEnabledDirective} from '@everyup/directives/forms/buttonEnabled';
import {ImageResizeInputDirective} from '@everyup/directives/forms/imageResizeInput';

@NgModule({
    declarations: [
        PreventBubblingDirective,
        InvalidControlCheckDirective,
        ButtonEnabledDirective,
        ImageResizeInputDirective,

        CapitalizePipe,
        BackgroundUrlPipe,
        FromNumberToArrayPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PreventBubblingDirective,
        InvalidControlCheckDirective,
        ButtonEnabledDirective,
        ImageResizeInputDirective,

        CapitalizePipe,
        BackgroundUrlPipe,
        FromNumberToArrayPipe
    ]
})
export class EveryUPModule {

}
