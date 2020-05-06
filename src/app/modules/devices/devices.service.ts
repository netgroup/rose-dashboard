import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Device} from '@models/devices.model';
import {ApiService} from '@modules/network/api.service';
import {DevicesFactory} from '@models/factories/devices.factory';
import {DeviceDescriptorInterface} from '@configs/network/api.descriptors';


@Injectable()
export class DevicesService {
    constructor(private API: ApiService) {

    }

    get(identifier: string): Observable<Device> {
        return this.API.Devices
            .get({ id: identifier })
            .pipe(
                map((device: DeviceDescriptorInterface) => DevicesFactory.create(device) as Device)
            );
    }

    fetch(payload: any): Observable<Device[]> {
        return this.API.Devices
            .fetch(payload)
            .pipe(
                 map((devices: DeviceDescriptorInterface[]) => DevicesFactory.create(devices) as Device[])
            );
    }

}
