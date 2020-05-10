import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularSvgIconModule} from 'angular-svg-icon';

import {EveryUPModule} from '@everyup/everyup.module';

import {SharedModule} from '@modules/shared/shared.module';
import {TopologiesRoutes} from '@modules/topology/topology.routes';
import { FormsModule } from '@angular/forms';
import { TopologyResolver } from '@modules/topology/resolvers/topology.resolver';
import { TopologiesService } from '@modules/topology/topology.service';
import { ViewerComponent } from '@modules/topology/components/viewer/viewer.component';
import { TopologyviewerComponent } from './components/topologyviewer/topologyviewer.component';

@NgModule({
    imports: [
        SharedModule,
        NgbModule,
        EveryUPModule,
        TranslateModule,
        RouterModule.forChild(TopologiesRoutes),
        AngularSvgIconModule,
        FormsModule
    ],
    providers: [
        TopologyResolver,
        TopologiesService
    ],
    declarations: [
        TopologyviewerComponent,
        ViewerComponent
    ]
})
export class TopologiesModule {

}
