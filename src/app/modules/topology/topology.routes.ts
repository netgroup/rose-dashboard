import { Routes } from '@angular/router';
import { ViewerComponent } from '@modules/topology/components/viewer/viewer.component';
import { TopologyResolver } from './resolvers/topology.resolver';


export const TopologiesRoutes: Routes = [
    /* {
        path: '',
        pathMatch: 'full',
        component: ListComponent
    }, {
        path: ':id',
        component: DetailsComponent,
        resolve: {
            //       topology: TopologyResolver
        }
    }, */
    {
        path: '',
        pathMatch: 'full',
        component: ViewerComponent,
        resolve: {
            topology: TopologyResolver
        }
    }
];
