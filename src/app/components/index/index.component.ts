import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { TitleService } from '@services/title.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    constructor(private router: Router,
                private title: TitleService) {
    }

    ngOnInit() {
        this.title.set('layout.titles.dashboard');

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd ) {
                if (event.url === '/') {
                    this.title.set('layout.titles.dashboard');
                }
            }
        });

    }
}
