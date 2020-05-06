import { NgModule } from '@angular/core';
import { DashboardViewComponent } from './components/view/view.component';
import { DashboardService } from '@modules/dashboard/dashboard.service';
import { DashboardResolver } from '@modules/dashboard/resolvers/dashboard.resolver';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from '@modules/dashboard/dashboard.routes';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        RouterModule.forChild(DashboardRoutes),
        TranslateModule,
        CommonModule,
    ],
    providers: [
        DashboardService,
        DashboardResolver
    ],
    declarations: [
        DashboardViewComponent
    ]
})
export class DashboardModule { }
