import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationService } from '@modules/authentication/authentication.service';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CheckPasswordGuards implements CanActivate {
    constructor( private authentication: AuthenticationService,
                 private router: Router,
                 private notifications: NotificationsService,
                 private translator: TranslateService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        if ( route.queryParams.email !== null && route.queryParams.token !== null) {

            const data = {
                email: route.queryParams.email,
                token: route.queryParams.token
            };

            return this.authentication.passwordTokenCheck(data)
                .pipe(
                    map(() => true),
                    catchError((error: any) => {
                        this.router.navigate(['/']);
                        this.notifications.error(
                            this.translator.instant('auth.recover.notifications.notSent'),
                            error.message
                        );
                        return of (false);
                    })
                );
        } else {
            return false;
        }
    }

}
