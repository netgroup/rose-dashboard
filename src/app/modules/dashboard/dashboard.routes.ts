import { Routes } from '@angular/router';
import { DashboardViewComponent } from '@modules/dashboard/components/view/view.component';
import { DashboardResolver } from '@modules/dashboard/resolvers/dashboard.resolver';

export const DashboardRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DashboardViewComponent,
        resolve: {
            dashboard: DashboardResolver
        }
    }
];
