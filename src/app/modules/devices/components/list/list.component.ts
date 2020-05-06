import { Component, OnInit } from '@angular/core';

import { TitleService } from '@services/title.service';
import { Device, DeviceType } from '@models/devices.model';
import { PaginatorService } from '@modules/shared/services/paginator.service';
import { DevicesService } from '@modules/devices/devices.service';
import { ResponsiveState } from 'ngx-responsive';
import { ModalConfirmComponent } from '@modules/shared/components/modals/confirm/confirm.component';
import { NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { NgProgress } from '@ngx-progressbar/core';
import { BreadcrumbService } from '@rose/services/breadcrumb.service';

@Component({
    selector: 'app-devices-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [
        PaginatorService
    ]
})
export class ListComponent implements OnInit {
    readonly DeviceType = DeviceType;
    subscription: Subscription;
    lastFilters;
    instances: Device[];

    constructor(private title: TitleService,
                private breadcrumb: BreadcrumbService,
                private deviceService: DevicesService,
                private device: ResponsiveState,
                public paginator: PaginatorService,
                private modal: NgbModal,
                private translator: TranslateService,
                private router: Router,
                private notifications: NotificationsService,
                private progress: NgProgress,
                private dropDownConfig: NgbDropdownConfig) {

        this.instances = [];
        this.dropDownConfig.placement = 'bottom-right';
    }

    ngOnInit() {
        this.paginator.createStream(this.deviceService.fetch.bind(this.deviceService)).subscribe(
            (devices: Device[]) => this.handleSubscriptionResponse(devices),
            (error: any) => this.handleSubscriptionError(error)
        );

        this.paginator.itemHeight = this.device.isMobile() ? 120 : 60;

        this.title.set('devices.list.title');
        this.breadcrumb.set([
            {
                url: '/',
                label: 'Home'
            },
            {
                label: 'EveryEdges'
            }
        ]);
        this.subscription = timer(10000, 10000)
            .subscribe(() => {
                this.paginator.setFilters(this.lastFilters);
            });

    }

    handleSubscriptionResponse(devices: Device[], reset: boolean = this.paginator.pagination.offset === 0) {
        reset ?
            this.instances = devices :
            this.instances.push(...devices);
    }

    handleSubscriptionError(error: any) {
        console.log(error);
    }

    onFiltersChange(filters: any) {
        this.lastFilters = filters;
        this.paginator.setFilters(filters);
    }

    onLoadMore() {
        this.paginator.nextPage();
    }


}
