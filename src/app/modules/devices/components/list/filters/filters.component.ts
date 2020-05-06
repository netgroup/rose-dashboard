import * as Moment from 'moment';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {ResponsiveState} from 'ngx-responsive';

import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {DatepickerConfig, DatepickerItalianFormatter} from '@configs/datepicker.config';
import {DeviceType} from '@models/devices.model';
import {DatesService} from '@services/dates.service';
import {PaginatorService} from '@modules/shared/services/paginator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from '@services/title.service';

interface FilterStreamInterface {
    key: string;
    value: any;
}

@Component({
    selector: 'app-devices-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    providers: [
        PaginatorService,
        DatepickerConfig,
        {
            provide: NgbDateParserFormatter,
            useClass: DatepickerItalianFormatter
        }
    ]
})
export class FiltersComponent implements OnInit {
    @Output() filtersChange: EventEmitter<{ [key: string]: string }>;

    filters: {
        subject: Subject<FilterStreamInterface>,
        data: { [key: string]: string  }
        visible: boolean;
    };

    loading: {
        term: boolean;
    };

    filterOptionsDescriptors: {
        [key: string]: any
    };

    constructor(private pickerConfig: DatepickerConfig,
                private formatter: NgbDateParserFormatter,
                private translator: TranslateService,
                private device: ResponsiveState,
                private route: ActivatedRoute,
                private router: Router,
                private title: TitleService) {

        this.filtersChange = new EventEmitter<{ [key: string]: string }>();
        this.filterOptionsDescriptors = {
            roles: [
                { title: this.translator.instant('devices.types.router'), value: DeviceType.ROUTER },
                // { title: this.translator.instant('commons.roles.device'), value: DeviceType.OPERATOR }
            ]
        };

        this.filters = {
            subject: new Subject<FilterStreamInterface>(),
            data: {},
            visible: !device.isMobile()
        };

        this.loading = {
            term: false
        };
    }

    ngOnInit() {

        this.route.queryParams
            .pipe(debounceTime(1000))
            .subscribe((params) => {
              this.filtersChange.emit(params);
            });

        this.filters.subject.pipe(debounceTime(1000)).subscribe((filter: FilterStreamInterface) => {
            if (filter.key.endsWith('Date')) {
                this.filters.data[filter.key] = filter.value
                    ? DatesService.fromDateStructToMoment(filter.value).toISOString()
                    : undefined;
            } else {
                this.filters.data[filter.key] = filter.value;
            }

            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: this.filters.data
            });
            this.title.set('devices.list.title');
        });
    }

    onDateInputFieldKeyPressed(key: string, value: string) {
        if (value.length === 0 || value.length !== 8 || !Moment.utc(value, 'DD/MM/YYYY').isValid()) {
            this.filters.subject.next({ key, value: null });
        }
    }
}
