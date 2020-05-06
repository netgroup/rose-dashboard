import {ModuleWithProviders, NgModule} from '@angular/core';
import {AngularSvgIconModule} from 'angular-svg-icon';

import {NotificationsContainerComponent} from '@modules/notifications/components/container/container.component';
import {NotificationsService} from '@modules/notifications/notifications.service';
import {SharedModule} from '@modules/shared/shared.module';

@NgModule({
    declarations: [NotificationsContainerComponent],
    imports: [
        SharedModule,
        AngularSvgIconModule
    ],
    providers: [NotificationsService],
    exports: [NotificationsContainerComponent]
})
export class NotificationsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NotificationsModule,
            providers: [NotificationsService]
        };
    }
}
