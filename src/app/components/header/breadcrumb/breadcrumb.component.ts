import { Component, Input, EventEmitter, OnInit, Output, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ResponsiveState } from 'ngx-responsive';
import { select, Store } from '@ngrx/store';

import { ApplicationState } from '@services/store/store.state';

@Component({
    selector: 'app-header-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent implements OnInit {

    breadcrumbs: any;

    constructor(private store: Store<ApplicationState>) {

    }

    ngOnInit() {
        this.breadcrumbs = [
            {
                url: '/',
                label: 'Home'
            }];
        this.store.pipe(
            select('config'),
            select('breadcrumb')
        ).subscribe((breadcrumb: []) => {
            this.breadcrumbs = breadcrumb;
        });
    }



}