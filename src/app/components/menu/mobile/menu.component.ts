import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Operator } from '@models/operators.model';
import { ApplicationState } from '@services/store/store.state';
import { TitleService } from '@services/title.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    operator: Observable<Operator>;

    constructor(private store: Store<ApplicationState>,
                private title: TitleService) {
        this.operator = this.store.pipe(
            select('authentication'),
            select('user')
        );

        this.title.set('mobileMenu.menu.title');
    }

    ngOnInit() {
    }

}
