import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {Observable} from 'rxjs';

import { map } from 'rxjs/operators';

import {Topology} from '@models/topologies.model';
import {ApplicationState} from '@services/store/store.state';
import {TopologiesService} from '@modules/topology/topology.service';

@Injectable()
export class TopologyResolver implements Resolve<Observable<Topology>> {
    constructor(private store: Store<ApplicationState>,
                private topologies: TopologiesService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Topology> {
        const topologyIdentifier: string = route.paramMap.get('id');
        return this.topologies.get('topology')
            .pipe(
                map((topology: Topology) => topology)
            );
        
    }
}
