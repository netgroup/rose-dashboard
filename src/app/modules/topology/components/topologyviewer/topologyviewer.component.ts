import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

import * as d3 from 'd3';

@Component({
    selector: 'app-topologyviewer',
    templateUrl: './topologyviewer.component.html',
    styleUrls: ['./topologyviewer.component.scss']
})

export class TopologyviewerComponent implements OnInit, AfterViewInit {

    @ViewChild('svg') chart_container: ElementRef;
    @Input('chartName') chartName: any;
    @Input('legendEnabled') legendEnabled: any;
    @Input('centerLabel') centerLabel: any;


    // values for all forces
    forceProperties = {
        center: {
            x: 0.5,
            y: 0.5
        },
        charge: {
            enabled: true,
            strength: -30,
            distanceMin: 1,
            distanceMax: 2000
        },
        collide: {
            enabled: true,
            strength: .7,
            iterations: 1,
            radius: 10
        },
        forceX: {
            enabled: false,
            strength: .1,
            x: .5
        },
        forceY: {
            enabled: false,
            strength: .1,
            y: .5
        },
        link: {
            enabled: true,
            distance: 50,
            iterations: 1
        }
    };


    @Input('data') set source(data: any) {

        this.graph = data;
        if (this.svg) {
            this.clearAll();
            this.draw();
        }
    }


    width: any;
    height: any;
    paused: boolean;
    svg: any;
    simulation: any;
    graph: any;
    selector: string;

    constructor() { }

    @HostListener('window:resize')
    onWindowResize() {
        if (this.svg) {
            //this.clearAll();
            //this.draw();
        }
    }

    ngOnInit() {
        this.selector = `app-topologyviewer.${this.chartName} #d3_container`;
        this.paused = false;
    }

    ngAfterViewInit() {
        setTimeout(() => this.draw(), 500);
        setTimeout(() => this.forceStop(), 4000);
    }

    private forceStop(): void {
        this.paused = true;
        this.simulation.stop();

    }

    private draw(): void {
        console.log('drawww')
        const self = this;
        const rect = this.chart_container.nativeElement.getBoundingClientRect();

        this.width = rect.width;
        this.height = rect.height;


        this.svg = d3.select('svg')
            .attr('oncontextmenu', 'return false;')
            .attr('width', this.width)
            .attr('height', this.height);
        // svg objects
        let linkSvg;
        let nodeSvg;

        // init force simulator
        self.simulation = d3.forceSimulation();

        // set up the simulation and event to update locations after each tick
        function initializeSimulation() {
            self.simulation.nodes(self.graph.nodes);
            initializeForces();
            self.simulation.on('tick', ticked);
        }

        // add forces to the simulation
        function initializeForces() {
            // add forces and associate each with a name
            self.simulation
                .force('link', d3.forceLink())
                .force('charge', d3.forceManyBody())
                .force('collide', d3.forceCollide())
                .force('center', d3.forceCenter());

            updateForces();
        }

        // apply new force properties
        function updateForces() {
            self.simulation.force('center',
                d3.forceCenter(self.width * self.forceProperties.center.x, self.height * self.forceProperties.center.y));

            self.simulation.force('charge', d3.forceManyBody()
                .strength(-500)
                .distanceMin(self.forceProperties.charge.distanceMin)
                .distanceMax(self.forceProperties.charge.distanceMax));


            self.simulation.force('link', d3.forceLink()
                .id((d: any) => d.id)
                .distance(self.forceProperties.link.distance)
                .iterations(self.forceProperties.link.iterations)
                .links(self.forceProperties.link.enabled ? self.graph.links : []));

            // updates ignored until this is run
            // restarts the simulation (important if simulation has already slowed down)
            self.simulation.alpha(1).restart();
        }


        // generate the svg objects and force simulation
        function initializeDisplay() {
            // set the data and properties of link lines
            linkSvg = self.svg.append('g')
                .attr('class', 'links')
                .selectAll('line')
                .data(self.graph.links)
                .enter().append('line')
                .style('stroke-width', 1.5)
                .style('stroke', 'black');

            // set the data and properties of node circles
            nodeSvg = self.svg.append('g')
                .attr('class', 'nodes')
                .selectAll('circle')
                .data(self.graph.nodes)
                .enter().append('circle')
                .style('fill', (d: any) => {
                    if (d.type === 'customer_host') {
                        return 'brown';
                    } else if (d.type === 'provider_host') {
                        return 'grey';
                    } else if (d.type === 'router') {
                        return 'blue';
                    } else { // unknow
                        return 'green';
                    }
                })
                .call(d3.drag()
                    .on('start', dragstarted)
                    .on('drag', dragged)
                    .on('end', dragended));

            // node tooltip
            nodeSvg.append('svg:text')
                .attr('class', 'node_text cleanable')
                .attr('dy', function (d) {
                        return '-5';
                })
                .attr('pointer-events', 'none')
                .style('font-size', '14px')
                .style('font-family', 'Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif')
                .style('fill', function (d) {
                    return 'black';
                })
                .text((d: any) => d.id);


            updateDisplay();
        }

        // update the display based on the forces (but not positions)
        function updateDisplay() {
            nodeSvg
                .attr('r', self.forceProperties.collide.radius)
                .attr('stroke', 'black')
                .attr('stroke-width', Math.abs(self.forceProperties.charge.strength) / 15);

            linkSvg
                .attr('stroke-width', self.forceProperties.link.enabled ? 1 : 0)
                .attr('opacity', self.forceProperties.link.enabled ? 1 : 0);
        }

        // update the display positions after each simulation tick
        function ticked() {
            linkSvg
                .attr('x1', (d: any) => d.source.x)
                .attr('y1', (d: any) => d.source.y)
                .attr('x2', (d: any) => d.target.x)
                .attr('y2', (d: any) => d.target.y);

            nodeSvg
                .attr('cx', (d: any) => d.x)
                .attr('cy', (d: any) => d.y);

        }

        function dragstarted(d: any) {
            if (!d3.event.active) { self.simulation.alphaTarget(0.3).restart(); }
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d: any) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d: any) {
            if (!d3.event.active) { self.simulation.alphaTarget(0.0001); }

            if (self.paused === false) {
                d.fx = null;
                d.fy = null;
            } else {
                d.fx = d.x;
                d.fy = d.y;
                self.simulation.stop();
                self.paused = true;
            }
        }

        initializeDisplay();
        initializeSimulation();
    }


    private clearAll(): void {
        if (this.svg) {

        }
    }

}
