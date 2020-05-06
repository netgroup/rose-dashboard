import {StoreAuthenticationReducers} from '@services/store/reducers/store.authentication.reducers';
import {StoreConfigReducers} from '@services/store/reducers/store.config.reducers';

export const ApplicationReducers = {
    authentication: StoreAuthenticationReducers,
    config: StoreConfigReducers
};
