import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress } from '@ngx-progressbar/core';
import { Router } from '@angular/router';

import { NotificationsService } from '@modules/notifications/notifications.service';
import { ButtonStates } from '@modules/shared/components/button/button.component';
import { AuthenticationService } from '@modules/authentication/authentication.service';
import { CustomValidators } from '@everyup/validators/custom.validators';


@Component({
  selector: 'app-auth-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {
    errors: { [key: string]: string };
    form: FormGroup;
    submitState: ButtonStates;

    constructor(private authentication: AuthenticationService,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private progress: NgProgress,
                private router: Router) {

        this.submitState = ButtonStates.DISABLED;
        this.form = this.defineForm();
        this.errors = {
            email: null
        };
    }

    ngOnInit() {
        this.form.statusChanges.subscribe(() => this.submitState = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED);
    }

    onSubmit() {

        this.form.get('submitted').setValue(true);
        this.form.get('email').markAsDirty();
        this.form.get('email').markAsTouched();
        this.form.get('email').updateValueAndValidity();

        if (this.submitState !== ButtonStates.ACTIVE) {
            return;
        }

        this.submitState = ButtonStates.LOADING;
        this.progress.ref().start();

        this.authentication
            .recoverPsw({ email: this.form.get('email').value})
            .subscribe(() => {
                this.progress.ref().complete();

                this.notifications.success(
                    this.translator.instant('auth.recover.notifications.title'),
                    this.translator.instant('auth.recover.notifications.message', { email: this.form.get('email').value })
                );

                this.form.reset();
                this.router.navigate(['/']);
            }, (error: any) => {
                this.progress.ref().complete();

                this.notifications.error(
                    this.translator.instant('auth.recover.notifications.title'),
                    error.message
                );
                this.form.reset();
                this.router.navigate(['/auth/password/recover']);
            } );


    }

    private defineForm(): FormGroup {
        return new FormGroup({
            submitted: new FormControl(false),
            email: new FormControl(null, [Validators.required, CustomValidators.email])
        });
    }

}
