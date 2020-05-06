import {Injectable} from '@angular/core';

import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';

import {ApplicationState} from '@services/store/store.state';
import {ConfigTitleChange} from '@services/store/actions/store.config.actions';

@Injectable()
export class TitleService {
    constructor(private store: Store<ApplicationState>,
                private translator: TranslateService) {

    }

    set(title: string = '') {
        title.length === 0
            ? this.store.dispatch(new ConfigTitleChange(''))
            : this.store.dispatch(new ConfigTitleChange(this.translator.instant(title)));
    }

}
