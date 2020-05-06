import {ConfigState} from '@services/store/states/store.config.state';
import {AuthenticationState} from '@services/store/states/store.authentication.state';

export interface ApplicationState {
    authentication: AuthenticationState;
    config: ConfigState;
}
