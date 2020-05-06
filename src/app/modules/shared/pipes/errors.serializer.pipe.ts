import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Pipe({ name: 'serializeErrors' })
export class ErrorsSerializerPipe implements PipeTransform {
    constructor(private translator: TranslateService) {

    }

    transform(errors: any, prefix: string): string {
        const translatedErrors = [];

        // Picking the last error
        Object.keys(errors || {}).slice(-1).forEach((error: string) => {
            const desiredTranslationString = `${prefix}.${error}`;
            let translatedString = this.translator.instant(desiredTranslationString);

            if (typeof errors[error] === 'object') {
                translatedString = this.translator.instant(desiredTranslationString, errors[error]);
            }

            if (desiredTranslationString !== translatedString) {
                translatedErrors.push(translatedString);
            }
        });

        return translatedErrors.join('<br />');
    }
}
