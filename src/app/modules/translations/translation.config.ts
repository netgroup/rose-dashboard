import * as BrowserLocale from 'browser-locale';

import { LanguageDefinition as ItalianLanguageDefinition } from '@configs/translations/it';

const TranslationDefinitions = {
    it: ItalianLanguageDefinition
};

const currentBrowserLanguage = (): string => {
    return BrowserLocale();
};

export {
    TranslationDefinitions,
    currentBrowserLanguage
};
