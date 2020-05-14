import {Routes} from '@angular/router';

import {ListComponent} from '@modules/devices/components/list/list.component';

export const DevicesRoutes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: ListComponent    
}];
