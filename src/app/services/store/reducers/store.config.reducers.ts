import * as Actions from '@services/store/actions/store.config.actions';

import { StoreActions } from '@rose/app.constants';
import { ConfigState, defineConfigInitialState } from '@services/store/states/store.config.state';

const initialState: ConfigState = defineConfigInitialState();

export function StoreConfigReducers(state: ConfigState = initialState, action: Actions.StoreConfigActions): ConfigState {
    let cast: Actions.ConfigTitleChange;

    switch (action.type) {
        case StoreActions.STORE_CONFIG_TITLE_UPDATE:
            cast = action as Actions.ConfigUpsert;
            return {
                title: action.payload,
                breadcrumb: state.breadcrumb,
                ...cast
            };
        case StoreActions.STORE_CONFIG_BREADCRUMB_UPDATE:
            cast = action as Actions.ConfigUpsert;
            return {
                title: state.title,
                breadcrumb:  action.payload,
                ...cast
            };
        default:
            return state;
    }
}
