import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Topology} from '@models/topologies.model';
import {ApiService} from '@modules/network/api.service';
import {TopologyFactory} from '@models/factories/topologies.factory';
import {TopologyDescriptorInterface} from '@configs/network/api.descriptors';


@Injectable()
export class TopologyService {
    constructor(private API: ApiService) {

    }

    get(identifier: string): Observable<Topology> {
        return this.API.Topology
            .get({ id: identifier })
            .pipe(
                map((device: TopologyDescriptorInterface) => TopologyFactory.create(device) as Topology)
            );
    }

    fetch(payload: any): Observable<Topology[]> {
        return this.API.Topology
            .fetch(payload)
            .pipe(
                 map((topologies: TopologyDescriptorInterface[]) => TopologyFactory.create(topologies) as Topology[])
            );
    }

}
