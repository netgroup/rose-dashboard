import {of} from 'rxjs';

import {TranslateLoader} from '@ngx-translate/core';
import {TranslationDefinitions} from '@modules/translations/translation.config';

export class TranslationLoader implements TranslateLoader {
    public getTranslation(lang: string): any {
        let translation = TranslationDefinitions[lang];

        if (!translation) {
            translation = TranslationDefinitions[lang.substr(0, 2)];
        }

        if (!translation) {
            console.warn(`No language definition found for ${lang}, falling back to english.`);

            translation = TranslationDefinitions['it'];
        }

        return of(translation);
    }
}
