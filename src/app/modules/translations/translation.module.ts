import {ModuleWithProviders, NgModule} from '@angular/core';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import {TranslationLoader} from './translation.loader';

export function StaticLoaderFactory() {
    return new TranslationLoader();
}

@NgModule({

})
export class TranslationModule {
    static forRoot(): ModuleWithProviders {
        return TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: StaticLoaderFactory
            }
        });
    }

    static forChild(): ModuleWithProviders {
        return TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: StaticLoaderFactory
            }
        });
    }
}
