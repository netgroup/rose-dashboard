import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';


import {merge} from 'rxjs';

import {Device} from '@models/devices.model';
import {CapitalizePipe} from '@everyup/pipes/strings/capitalize.pipe';
import {CustomValidators} from '@everyup/validators/custom.validators';
import {ButtonStates} from '@modules/shared/components/button/button.component';
import {DevicesService} from '@modules/devices/devices.service';
import {NotificationsService} from '@modules/notifications/notifications.service';
import { TitleService } from '@services/title.service';
import { BreadcrumbService } from '@rose/services/breadcrumb.service';



@Component({
    selector: 'app-devices-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    
    device: Device;
    

    constructor(private devices: DevicesService,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private router: Router,
                private route: ActivatedRoute,
                private breadcrumb: BreadcrumbService,
                private title: TitleService) {


    }

    ngOnInit() {
       
        this.device  = this.route.snapshot.data['device'];
        
        this.title.set(`devices.details.title`);
        this.breadcrumb.set([
            {
                url: '/',
                label: 'Home'
            },
            {
                url: '/devices',
                label: 'EveryEdges'
            },
            {
                label: 'Details'
            }
        ]);

    }

    onSubmit() {

    }


}
