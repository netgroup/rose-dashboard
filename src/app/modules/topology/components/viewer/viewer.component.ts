import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { Topology } from '@rose/models/topologies.model';
import { CapitalizePipe } from '@everyup/pipes/strings/capitalize.pipe';

import { ButtonStates } from '@modules/shared/components/button/button.component';
import { TopologiesService } from '@modules/topology/topology.service';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { TitleService } from '@services/title.service';
import { BreadcrumbService } from '@rose/services/breadcrumb.service';


@Component({
    selector: 'app-topology-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
    topology: any;
    constructor(private topologyService: TopologiesService,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private router: Router,
                private route: ActivatedRoute,
                private breadcrumb: BreadcrumbService,
                private title: TitleService) {

    }

  
    ngOnInit() {

        this.topology = this.route.snapshot.data['topology'];
        
        this.title.set(`topology.viewer.title`);
        this.breadcrumb.set([
            {
                url: '/',
                label: 'Home'
            },
            {
                label: this.translator.instant(`topology.viewer.title`)
            }
        ]);

       
    }


}
