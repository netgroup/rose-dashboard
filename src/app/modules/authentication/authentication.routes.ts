import {Routes} from '@angular/router';

import {SigninComponent} from '@modules/authentication/components/signin/signin.component';
import {SignoutComponent} from '@modules/authentication/components/signout/signout.component';
import {SignoutUserGuard} from '@modules/authentication/guards/signout.user.guards';
import {GuestUserGuard} from '@modules/shared/guards/guest.user.guard';
import {LoggedUserGuard} from '@modules/shared/guards/logged.user.guard';
import {RecoverComponent} from '@modules/authentication/components/password/recover/recover.component';
import {ChangeComponent} from '@modules/authentication/components/password/change/change.component';
import {CheckPasswordGuards} from '@modules/authentication/guards/check.password.guards';
import {ActivateComponent} from '@modules/authentication/components/activate/activate.component';

export const AuthenticationRoutes: Routes = [{
    path: 'signin',
    component: SigninComponent,
    canActivate: [GuestUserGuard]
}, {
    path: 'signout',
    component: SignoutComponent,
    canActivate: [LoggedUserGuard, SignoutUserGuard]
}, {
    path: 'password/recover',
    component: RecoverComponent,
    canActivate: [GuestUserGuard]
}, {
    path: 'recover',
    component: ChangeComponent,
    canActivate: [GuestUserGuard, CheckPasswordGuards]
}, {
    path: 'activate',
    component: ActivateComponent
}];
