import {Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import {Operator} from '@models/operators.model';
import {ApplicationState} from '@services/store/store.state';

@Injectable()
export class LoggedUserResolver implements Resolve<Observable<Operator>> {
    constructor(private store: Store<ApplicationState>) {

    }

    resolve(): Observable<Operator> {
        return this.store.pipe(
            select('auth'),
            select('user')
        ).pipe(
            take(1)
        );
    }
}
