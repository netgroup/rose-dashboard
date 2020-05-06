import {Routes} from '@angular/router';
import {DetailsComponent} from '@modules/devices/components/details/details.component';
import {DeviceResolver} from '@modules/devices/resolvers/devices.resolver';
import {ListComponent} from '@modules/devices/components/list/list.component';

export const DevicesRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: ListComponent    
}, {
    path: ':id',
    component: DetailsComponent,
    resolve: {
        device: DeviceResolver
    }
}];
