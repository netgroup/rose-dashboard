import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@modules/network/api.service';
import { Dashboard } from '@models/dashboard.model';
import { DashboardDescriptorInterface } from '@configs/network/api.descriptors';
import { DashboardFactory } from '@models/factories/dashboard.factory';


@Injectable()
export class DashboardService {
    constructor(private API: ApiService) {

    }

    get(): Observable<Dashboard> {
        return this.API.Dashboard
            .get()
            .pipe(
                map((dashboard: DashboardDescriptorInterface) => DashboardFactory.create(dashboard) as Dashboard)
            );
    }

}
