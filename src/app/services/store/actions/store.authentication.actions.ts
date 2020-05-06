import {Action} from '@ngrx/store';
import {StoreActions} from '@rose/app.constants';

export class AuthenticationUserSignin implements Action {
    readonly type = StoreActions.STORE_AUTH_SIGNIN;

    constructor(public payload: any) {

    }
}

export class AuthenticationUserUpdate implements Action {
    readonly type = StoreActions.STORE_USER_UPDATE;

    constructor(public payload: any) {

    }
}

export class AuthenticationUserSignout implements Action {
    readonly type = StoreActions.STORE_AUTH_SIGNOUT;
}

export type StoreAuthenticationActions = AuthenticationUserSignin | AuthenticationUserUpdate | AuthenticationUserSignout;
