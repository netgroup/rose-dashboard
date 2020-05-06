import * as Actions from '@services/store/actions/store.authentication.actions';
import {AuthenticationState, defineAuthenticationInitialState} from '@services/store/states/store.authentication.state';
import {Operator} from '@models/operators.model';
import {StoreActions} from '@rose/app.constants';

const initialState: AuthenticationState = defineAuthenticationInitialState();

export function StoreAuthenticationReducers(state: AuthenticationState = initialState, action: Actions.StoreAuthenticationActions) {
    let cast: Actions.AuthenticationUserSignin;
    let operator: Operator;

    switch (action.type) {
        case StoreActions.STORE_AUTH_SIGNIN:
            cast = action as Actions.AuthenticationUserSignin;
            operator = cast.payload as Operator;

            return {
                ...state,
                user: operator
            };
        default:
            return state;
    }
}
