import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import { Operator } from '@models/operators.model';
import {ApplicationState} from '@services/store/store.state';
import { Router } from '@angular/router';

@Component({
    selector: 'app-side-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    operator: Observable<Operator>;

    constructor(private store: Store<ApplicationState>,
                private router: Router) {
        this.operator = this.store.pipe(
            select('authentication'),
            select('user')
        );
    }

    ngOnInit() {
    }

    isLinkActive(url): boolean {
        const queryParamsIndex = this.router.url.indexOf('?');
        const baseUrl = queryParamsIndex === -1 ? this.router.url :
            this.router.url.slice(0, queryParamsIndex);
        return baseUrl === url;
    }
}
