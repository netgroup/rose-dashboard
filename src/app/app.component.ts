import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {currentBrowserLanguage} from '@rose/modules/translations/translation.config';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {NgProgress} from '@ngx-progressbar/core';
import {TitleService} from '@services/title.service';

const ProgressRoutingMap = {
    NavigationStart: 0.1,
    GuardsCheckStart: 0.3,
    GuardsCheckEnd: 0.5,
    ResolveStart: 0.7,
    ResolveEnd: 0.8,
    NavigationCancel: 1,
    NavigationEnd: 1
};

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private translator: TranslateService,
                private title: TitleService,
                private router: Router,
                private progress: NgProgress) {

        this.translator.setDefaultLang(currentBrowserLanguage());

        this.router.events.subscribe(event => {
            const eventId = event.toString().substring(0, event.toString().indexOf('('));

            if (event instanceof NavigationStart) {
                this.title.set('');
                this.progress.ref().start();
            } else if (event instanceof NavigationEnd) {
                this.progress.ref().complete();
            } else {
                if (ProgressRoutingMap[eventId] > 0) {
                    this.progress.ref().set(ProgressRoutingMap[eventId]);
                }
            }
        });
    }
}
