import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {Observable} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';

import {Device} from '@models/devices.model';
import {ApplicationState} from '@services/store/store.state';
import {DevicesService} from '@modules/devices/devices.service';

@Injectable()
export class DeviceResolver implements Resolve<Observable<Device>> {
    constructor(private store: Store<ApplicationState>,
                private devices: DevicesService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Device> {
        const deviceIdentifier: string = route.paramMap.get('id');

        // FIXME fetch from ngrx store and from remote if it doesn't exists
        return this.store.pipe(
            select('authentication'),
            select('user')
        ).pipe(
            take(1),
            switchMap((device: Device) => {
                // if (!user || user.id !== deviceIdentifier) {
                    return this.devices.get(deviceIdentifier);
                // }

                // return of(user);
            })
        );
    }
}
