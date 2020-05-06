import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as d3 from 'd3';
import { TitleService } from '@services/title.service';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from '@rose/services/breadcrumb.service';

@Component({
    selector: 'app-dashboard-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss']
})
export class DashboardViewComponent implements OnInit, AfterViewInit {

    dashboard: any;

    constructor(private route: ActivatedRoute,
                private title: TitleService,
                private breadcrumb: BreadcrumbService) { }



    ngOnInit() {
        this.title.set('layout.titles.dashboard');
        this.breadcrumb.set([
            {
                url: '/',
                label: 'Home'
            }
        ]);
        this.dashboard = this.route.snapshot.data['dashboard'];
       
        console.log(this.dashboard)
    }

    ngAfterViewInit() {

    }


}
