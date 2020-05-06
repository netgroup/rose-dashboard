import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {NgProgress} from '@ngx-progressbar/core';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {isExcludedFromHandling} from '@configs/network/api.exclusions';
import {NotificationsService} from '@modules/notifications/notifications.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private progress: NgProgress) {

    }

    intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        if (isExcludedFromHandling(request.url)) {
            return handler.handle(request);
        }

        const clonedRequest = request.clone();

        return handler.handle(clonedRequest)
            .pipe(
                tap(
                    null,
                    (error) => {
                        if (error instanceof HttpErrorResponse) {
                            if (error.status === 403) {
                                this.notifications.error(
                                    this.translator.instant('commons.warning'),
                                    this.translator.instant('errors.forbidden')
                                );

                                this.progress.ref().complete();
                            } else if (error.status === 404) {
                                this.router.navigate(['/errors', '404']);
                            } else if (error.status >= 500) {
                                this.router.navigate(['/errors', '500']);
                            }
                        }
                    }
                )
            );
    }
}
