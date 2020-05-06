import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';

import {AuthenticationService} from '@modules/authentication/authentication.service';

@Injectable()
export class SignoutUserGuard implements CanActivate {
    constructor(private authentication: AuthenticationService,
                private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authentication
            .signout()
            .pipe(
                finalize(() => {
                    this.authentication.signout().subscribe();
                    this.router.navigate(['/auth/signin']);
                }),
                tap(() => false)
            );
    }
}
