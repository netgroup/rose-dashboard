import { Routes } from '@angular/router';

import { IndexComponent } from '@rose/components/index/index.component';
import { LoggedUserGuard } from '@modules/shared/guards/logged.user.guard';
import { MenuComponent } from '@rose/components/menu/mobile/menu.component';
import { MobileGuard } from '@modules/shared/guards/mobile.guards';

export const ApplicationRoutes: Routes = [{
    path: 'auth',
    loadChildren: '@rose/modules/authentication/authentication.module#AuthenticationModule'
}, {
    path: '',
    component: IndexComponent,
    // canActivate: [LoggedUserGuard],
    children: [{
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    }, {
        path: 'dashboard',
        loadChildren: '@rose/modules/dashboard/dashboard.module#DashboardModule'
    }, {
        path: 'devices',
        loadChildren: '@rose/modules/devices/devices.module#DevicesModule'
    }, {
        path: 'topology',
        loadChildren: '@rose/modules/topology/topology.module#TopologiesModule'
    }, {
        path: 'settings',
        component: MenuComponent,
        canActivate: [MobileGuard]
    }]
}];
