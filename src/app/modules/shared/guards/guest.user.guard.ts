import * as Moment from 'moment';

import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {select, Store} from '@ngrx/store';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Operator} from '@models/operators.model';
import {StorageKeys} from '@rose/app.constants';
import {StorageService} from '@services/storage/storage.service';
import {ApplicationState} from '@services/store/store.state';

@Injectable()
export class GuestUserGuard implements CanActivate, CanActivateChild {
    constructor(private store: Store<ApplicationState>,
                private storage: StorageService,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canProceed();
    }
    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canProceed();
    }

    private canProceed(): Observable<boolean> {
        return this.store.pipe(
            select('authentication'),
            select('user')
        ).pipe(
            map(
            (operator: Operator) => {
                let loggedIn = operator != null && this.storage.get(StorageKeys.STORAGE_TOKEN_KEY) != null;

                if (Moment().isAfter(this.storage.get(StorageKeys.STORAGE_TOKEN_EXP_KEY))) {
                    console.warn('Detected an outdated session. Logging out.');

                    this.storage.unset(StorageKeys.STORAGE_USER_KEY);
                    this.storage.unset(StorageKeys.STORAGE_TOKEN_EXP_KEY);
                    this.storage.unset(StorageKeys.STORAGE_TOKEN_KEY);

                    loggedIn = false;
                }

                if (loggedIn) {
                    console.warn('User is already logged. Going to / main route.');

                    this.router.navigate(['/']);
                }

                return !loggedIn;
            })
        );
    }
}
