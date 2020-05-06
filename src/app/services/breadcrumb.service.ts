import {Injectable} from '@angular/core';

import {Store} from '@ngrx/store';

import {ApplicationState} from '@services/store/store.state';
import {ConfigBreadcrumbChange} from '@services/store/actions/store.config.actions';

@Injectable()
export class BreadcrumbService {
    constructor(private store: Store<ApplicationState>) {

    }

    set(breadcrumb: any = []) {
        breadcrumb.length === 0
            ? this.store.dispatch(new ConfigBreadcrumbChange([]))
            : this.store.dispatch(new ConfigBreadcrumbChange(breadcrumb));
    }

}
