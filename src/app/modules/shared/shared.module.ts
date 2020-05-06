import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InternationalPhoneNumberModule} from 'ngx-international-phone-number';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ResponsiveModule} from 'ngx-responsive';
import {MomentModule} from 'ngx-moment';

import {ButtonComponent} from '@modules/shared/components/button/button.component';
import {ErrorsSerializerPipe} from '@modules/shared/pipes/errors.serializer.pipe';
import {LoggedUserResolver} from '@modules/shared/resolvers/logged.user.resolver';
import {LoggedUserGuard} from '@modules/shared/guards/logged.user.guard';
import {GuestUserGuard} from '@modules/shared/guards/guest.user.guard';
import {ModalConfirmComponent} from '@modules/shared/components/modals/confirm/confirm.component';
import {MobileGuard} from '@modules/shared/guards/mobile.guards';

@NgModule({
    entryComponents: [
        ModalConfirmComponent
    ],
    declarations: [
        ButtonComponent,
        ModalConfirmComponent,

        ErrorsSerializerPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ResponsiveModule,
        MomentModule,
        InfiniteScrollModule
    ],
    providers: [
        LoggedUserResolver,
        LoggedUserGuard,
        GuestUserGuard,
        MobileGuard
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ResponsiveModule,
        MomentModule,
        InfiniteScrollModule,
        InternationalPhoneNumberModule,

        ErrorsSerializerPipe,

        ButtonComponent,
        ModalConfirmComponent
    ]
})
export class SharedModule {

}
