import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Dashboard } from '@models/dashboard.model';
import { DashboardService } from '@modules/dashboard/dashboard.service';

@Injectable()
export class DashboardResolver implements Resolve<Observable<Dashboard>> {
    constructor(private dashboardService: DashboardService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Dashboard> {
        return this.dashboardService.get()
            .pipe(
                map((dashboard: Dashboard) => dashboard)
            );
    }
}
