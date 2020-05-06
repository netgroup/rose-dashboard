import {Action} from '@ngrx/store';
import {StoreActions} from '@rose/app.constants';

export class ConfigUpsert implements Action {
    readonly type = StoreActions.STORE_CONFIG_UPSERT;

    constructor(public payload: any) {

    }
}

export class ConfigTitleChange implements Action {
    readonly type = StoreActions.STORE_CONFIG_TITLE_UPDATE;

    constructor(public payload: any) {

    }
}

export class ConfigBreadcrumbChange implements Action {
    readonly type = StoreActions.STORE_CONFIG_BREADCRUMB_UPDATE;

    constructor(public payload: any) {

    }
}

export type StoreConfigActions = ConfigUpsert | ConfigTitleChange | ConfigBreadcrumbChange;
