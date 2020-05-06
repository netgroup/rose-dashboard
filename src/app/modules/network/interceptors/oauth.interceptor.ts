import * as Moment from 'moment';
import * as ApiDefinitions from '@configs/network/api.definitions';

import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {StorageKeys} from '@rose/app.constants';
import {StorageService} from '@services/storage/storage.service';
import {NotificationType} from '@modules/notifications/notifications.interfaces';
import {NotificationsService} from '@modules/notifications/notifications.service';
import {ApplicationState} from '@services/store/store.state';
import {AuthenticationUserSignout} from '@services/store/actions/store.authentication.actions';

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {
    constructor(private storage: StorageService,
                private router: Router,
                private store: Store<ApplicationState>,
                private notifications: NotificationsService,
                private translator: TranslateService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.mustHandleRequest(request.url)) {
            return next.handle(request);
        }

        const currentPath = request.url;
        const currentMethod = request.method.toLowerCase();

        try {
            // We'll going to extend the request only if the route is protected as specified by the swagger
            if (ApiDefinitions.paths[currentPath][currentMethod].hasOwnProperty('security')) {
                if (this.storage.get(StorageKeys.STORAGE_TOKEN_TYPE) === 'JWT') {
                    request = request.clone({
                        headers: request.headers.set('Authorization', this.storage.get(StorageKeys.STORAGE_TOKEN_KEY) || '')
                    });
                } else if (this.storage.get(StorageKeys.STORAGE_TOKEN_TYPE) === 'X-Auth-Token') {
                    request = request.clone({
                        headers: request.headers.set('X-Auth-Token', this.storage.get(StorageKeys.STORAGE_TOKEN_KEY) || '')
                    });
                }
            }
        } catch (error) {
            console.error('OAuthInterceptor', 'Unable to handle incoming request');
            console.error('OAuthInterceptor', error);
        }

        return next.handle(request).pipe(tap(
            (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {

                    // Saving token into local storage if it is an authorization route
                    if (this.mustHandleToken(event.url, event.body)) {
                        const expirationDate = Moment().add(event.body.expires_in - 60, 'seconds');
                        let accessToken = '';
                        if (event.body.token_type === 'JWT') {
                            accessToken = `${event.body.token_type} ${event.body.access_token.replace('JWT', '').trim()}`;
                        } else if (event.body.token_type === 'X-Auth-Token') {
                            accessToken = event.body.access_token;
                        }
                        this.storage.set(StorageKeys.STORAGE_TOKEN_TYPE, event.body.token_type);
                        this.storage.set(StorageKeys.STORAGE_TOKEN_EXP_KEY, expirationDate.toISOString());
                        this.storage.set(StorageKeys.STORAGE_TOKEN_KEY, accessToken);
                    }
                }
            },
            (response: any) => {
                if (response instanceof HttpErrorResponse) {
                    if (response.status === 401 ) {
                        this.storage.unset(StorageKeys.STORAGE_USER_KEY);
                        this.storage.unset(StorageKeys.STORAGE_TOKEN_KEY);
                        this.storage.unset(StorageKeys.STORAGE_TOKEN_EXP_KEY);
                        this.storage.unset(StorageKeys.STORAGE_TOKEN_TYPE);

                        this.store.dispatch(new AuthenticationUserSignout());

                        this.notifications.add({
                            type: NotificationType.ERROR,
                            title: this.translator.instant('commons.warning'),
                            message: this.translator.instant('errors.unauthorized')
                        });

                        this.router.navigate(['/auth/signin']);
                    }
                }
            }
        ));
    }

    private mustHandleRequest(url): boolean {
        const urlMatchesRegex = url.match(/^\/(assets|fonts)\//);

        return !urlMatchesRegex;
    }

    private mustHandleToken(url, body): boolean {
        const urlMatchesRegex = url.match(/\/auth\/(signin|signup)$/) != null;
        const hasAccessToken = urlMatchesRegex && body.expires_in != null && body.token_type != null && body.access_token != null;

        return hasAccessToken;
    }
}
