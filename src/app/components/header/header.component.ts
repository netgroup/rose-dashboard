import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';

import {ApplicationState} from '@services/store/store.state';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @ViewChild('title') title: ElementRef;

    constructor(private store: Store<ApplicationState>) {

    }

    ngOnInit() {
        this.store.pipe(
            select('config'),
            select('title')
        ).subscribe((title: string) => {
            this.title.nativeElement.innerText = title || '';
        });
    }
}
