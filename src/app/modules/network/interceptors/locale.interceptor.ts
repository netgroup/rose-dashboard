import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {currentBrowserLanguage} from '@modules/translations/translation.config';

export class LocaleInterceptor implements HttpInterceptor {
    readonly fallbackLanguage = 'en-US';

    intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        let modifiedRequest: HttpRequest<any>;
        let requestParams: any;
        let language = currentBrowserLanguage();

        language = language.length > 2 ? language.substr(0, 2) : language;

        if (['get', 'delete'].indexOf(request.method.toLowerCase()) >= 0) {
            requestParams = [];
            request.params.keys().forEach(key => requestParams.push(`${key}=${request.params.get(key)}`));

            modifiedRequest = request.clone({
                params: new HttpParams({
                    fromString: requestParams.concat([`locale=${language || this.fallbackLanguage}`]).join('&')
                })
            });
        } else {
            requestParams = request.body || {};
            requestParams.locale = language || this.fallbackLanguage;

            modifiedRequest = request.clone({
                body: requestParams
            });
        }

        return handler.handle(modifiedRequest);
    }
}
