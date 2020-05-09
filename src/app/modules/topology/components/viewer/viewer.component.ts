import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { Topology } from '@rose/models/topologies.model';
import { CapitalizePipe } from '@everyup/pipes/strings/capitalize.pipe';

import { ButtonStates } from '@modules/shared/components/button/button.component';
import { TopologiesService } from '@modules/topology/topology.service';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { TitleService } from '@services/title.service';
import { BreadcrumbService } from '@rose/services/breadcrumb.service';
import sigma from 'sigma';
// declare module sigma: any;



@Component({
    selector: 'app-topology-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

    graph: sigma;
    properties: {
        name: string,
        count: number
    }[] = [];

    constructor(private topology: TopologiesService,
        private notifications: NotificationsService,
        private translator: TranslateService,
        private router: Router,
        private route: ActivatedRoute,
        private breadcrumb: BreadcrumbService,
        private title: TitleService) {


    }

    private async addLayer(count: number, layer: number, name: string, previous?: string) {
        this.properties.push({
            name: name,
            count: count
        });

        for (let i = 0; i < count; i++) {
            this.graph.graph.addNode({
                id: `${name}-${i}`,
                x: i / 2,
                y: layer,
                label: `${name}-${i}`,
                size: 1
            });

            if (!previous) { continue; }

            // for (let j = 0; j < this.properties.reverse()[1].count; j ++) {
            //   this.graph.graph.addEdge({
            //     id: `${previous}${j}-${name}${i}`,
            //     source: `${previous}-${j}`,
            //     target: `${name}-${i}`
            //   });
            // }
        }
        this.graph.refresh();
    }

    ngOnInit() {

        this.topology = this.route.snapshot.data['topology'];
        this.title.set(`topology.viewer.title`);
        this.breadcrumb.set([
            {
                url: '/',
                label: 'Home'
            },
            {
                label: this.translator.instant(`topology.viewer.title`)
            }
        ]);

        this.graph = new sigma('container');
        this.graph.settings({
            edgeColor: 'default',
            defaultEdgeColor: '#999',
            batchEdgesDrawing: true,
            sideMargin: 1,
            canvasEdgesBatchSize: 5,
            edgeHoverSizeRatio: 2
        });

        this.addLayer(5, 0, 'input');
        this.addLayer(10, 1, 'dense', 'input');
        this.addLayer(10, 2, 'dense_2', 'dense');
        console.log(this.graph.graph.nodes());

    }


}
