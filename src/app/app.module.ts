import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgProgressModule} from '@ngx-progressbar/core';
import {TranslateModule} from '@ngx-translate/core';
import {ResponsiveModule} from 'ngx-responsive';
import {StoreModule} from '@ngrx/store';
import {AngularSvgIconModule} from 'angular-svg-icon';


import {EveryUPModule} from '@everyup/everyup.module';

import {AppComponent} from '@rose/app.component';
import {ApplicationRoutes} from '@rose/app.routes';
import {ApiModule} from '@modules/network/api.module';
import {TranslationModule} from '@rose/modules/translations/translation.module';
import {NotificationsModule} from '@modules/notifications/notifications.module';
import {HeaderComponent} from '@rose/components/header/header.component';
import {IndexComponent} from '@rose/components/index/index.component';
import {MenuComponent as MenuDesktopComponent} from '@rose/components/menu/desktop/menu.component';
import {MenuComponent as MenuMobileComponent} from '@rose/components/menu/mobile/menu.component';
import {ApplicationReducers} from '@services/store/store.reducers';
import {StorageService} from '@services/storage/storage.service';
import {TitleService} from '@services/title.service';
import { BreadcrumbComponent } from '@rose/components/header/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from '@rose/services/breadcrumb.service';


@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        HeaderComponent,
        BreadcrumbComponent,
        MenuDesktopComponent,
        MenuMobileComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgbModule,
        NgProgressModule,
        EveryUPModule,
        ApiModule,
        TranslateModule,
        TranslationModule.forRoot(),
        ResponsiveModule.forRoot(),
        NotificationsModule.forRoot(),
        AngularSvgIconModule.forRoot(),
        StoreModule.forRoot(ApplicationReducers),
        RouterModule.forRoot(ApplicationRoutes)
    ],
    providers: [
        StorageService,
        TitleService,
        BreadcrumbService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
