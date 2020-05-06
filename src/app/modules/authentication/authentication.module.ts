import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {EveryUPModule} from '@everyup/everyup.module';
import {SharedModule} from '@rose/modules/shared/shared.module';
import {SigninComponent} from '@rose/modules/authentication/components/signin/signin.component';
import {AuthenticationRoutes} from '@rose/modules/authentication/authentication.routes';
import {AuthenticationService} from '@modules/authentication/authentication.service';
import {SignoutComponent} from '@modules/authentication/components/signout/signout.component';
import {SignoutUserGuard} from '@modules/authentication/guards/signout.user.guards';
import {RecoverComponent} from './components/password/recover/recover.component';
import {ChangeComponent} from './components/password/change/change.component';
import {CheckPasswordGuards} from '@modules/authentication/guards/check.password.guards';
import {ActivateComponent} from './components/activate/activate.component';

@NgModule({
    imports: [
        SharedModule,
        EveryUPModule,
        TranslateModule,
        RouterModule.forChild(AuthenticationRoutes)
    ],
    providers: [
        AuthenticationService,

        SignoutUserGuard,

        CheckPasswordGuards
    ],
    declarations: [
        SigninComponent,
        SignoutComponent,
        RecoverComponent,
        ChangeComponent,
        ActivateComponent
    ]
})
export class AuthenticationModule {

}
