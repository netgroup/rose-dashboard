import * as Moment from 'moment';

import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';

import {ClientKeys, StorageKeys} from '@rose/app.constants';

import {Operator} from '@models/operators.model';
import {ApiService} from '@modules/network/api.service';
import {OperatorsFactory} from '@models/factories/operators.factory';
import {StorageService} from '@services/storage/storage.service';
import {ApplicationState} from '@services/store/store.state';
import {LoginDescriptorInterface, OperatorDescriptorInterface} from '@configs/network/api.descriptors';
import {AuthenticationUserSignin, AuthenticationUserSignout} from '@services/store/actions/store.authentication.actions';

@Injectable()
export class AuthenticationService {
    private loggedIn: boolean;

    constructor(private API: ApiService,
                private store: Store<ApplicationState>,
                private storage: StorageService) {

        this.store.pipe(
            select('authentication'),
            select('user')
        ).subscribe(
            (operator: Operator) => {
                this.loggedIn = operator != null && this.storage.get(StorageKeys.STORAGE_TOKEN_KEY) != null;

                if (Moment().isAfter(this.storage.get(StorageKeys.STORAGE_TOKEN_EXP_KEY))) {
                    console.warn('Detected an outdated session. Logging out.');

                    // Token is expired, requesting a new login
                    this.storage.unset(StorageKeys.STORAGE_TOKEN_EXP_KEY);
                    this.storage.unset(StorageKeys.STORAGE_TOKEN_KEY);

                    this.loggedIn = false;
                }
            }
        );
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    signin(data: { username: string, password: string }): Observable<Operator> {
        const payload = {
            client_id: ClientKeys.id,
            client_secret: ClientKeys.secret,
            grant_type: 'password',
            scope: '*',
            ...data
        };

        return this.API.Authentication.Operators
            .signin(payload)
            .pipe(
                map((response: LoginDescriptorInterface) => {
                    const descriptor = response.user as OperatorDescriptorInterface;
                    const instance = OperatorsFactory.create(descriptor) as Operator;

                    this.storage.set(StorageKeys.STORAGE_USER_KEY, instance);
                    this.store.dispatch(new AuthenticationUserSignin(instance));

                    return instance;
                })
            );
    }

    signout(): Observable<boolean> {
        return this.API.Authentication.Operators
            .signout()
            .pipe(
                finalize(() => {
                    this.storage.unset(StorageKeys.STORAGE_TOKEN_KEY);
                    this.storage.unset(StorageKeys.STORAGE_TOKEN_EXP_KEY);
                    this.storage.unset(StorageKeys.STORAGE_USER_KEY);

                    this.store.dispatch(new AuthenticationUserSignout());
                }),
                map(() => true)
            );
    }

    recoverPsw(data: {email: string}): Observable<boolean> {
        return this.API.Authentication.Operators.Password.requestRecover(data);
    }

    passwordTokenCheck(data: {token: string, email: string}) {
        return this.API.Authentication.Operators.Password.checkRecoverToken(data);
    }

    changePsw(data: {token: string, password: string, email: string}): Observable<boolean>{
        return this.API.Authentication.Operators.Password.reset(data);
    }

    activate(token: string) {
        return this.API.Authentication.activation({
            token: token
        });
    }
}
