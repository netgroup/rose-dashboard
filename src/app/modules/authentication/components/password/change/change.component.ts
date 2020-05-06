import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgProgress } from '@ngx-progressbar/core';
import { TranslateService } from '@ngx-translate/core';

import { ButtonStates } from '@modules/shared/components/button/button.component';
import { CustomValidators } from '@everyup/validators/custom.validators';
import { AuthenticationService } from '@modules/authentication/authentication.service';
import { NotificationsService } from '@modules/notifications/notifications.service';

/* tslint:disable object-literal-key-quotes */
@Component({
  selector: 'app-change-psw',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {
    errors: { [key: string]: string };
    form: FormGroup;
    submitState: ButtonStates;
    formErrorMessage: string;

    constructor(private authentication: AuthenticationService,
                private notifications: NotificationsService,
                private translator: TranslateService,
                private progress: NgProgress,
                private router: Router,
                private route: ActivatedRoute) {

        this.submitState = ButtonStates.DISABLED;
        this.form = this.defineForm();
        this.errors = {
            'password': null,
            'confirm-password': null,
            'form': null
        };

    }

    ngOnInit() {
        this.form.statusChanges.subscribe(() => {
            this.submitState = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;

            this.formErrorMessage = this.form.hasError('passwordsMismatch') && this.form.get('password-confirm').errors == null
                ? 'errors.validations.passwords.mismatch'
                : '';
        });
    }

    onSubmit() {
        this.form.get('submitted').setValue(true);

        Object.keys(this.form.controls).forEach((field: string) => {
            this.form.get(field).markAsDirty();
            this.form.get(field).markAsTouched();
            this.form.get(field).updateValueAndValidity();
        });

        if (this.submitState !== ButtonStates.ACTIVE) {
            return;
        }

        this.submitState = ButtonStates.LOADING;
        this.progress.ref().start();

        const token = this.route.snapshot.queryParams.token;
        const email = this.route.snapshot.queryParams.email;
        const password = this.form.controls.password.value;

        this.authentication.changePsw({token: token, email: email, password: password})
            .subscribe(() => {
                this.router.navigate(['/']);
                this.notifications.success(
                    this.translator.instant('auth.change.notifications.title'),
                    this.translator.instant('auth.change.notifications.message')
                );
            }, (error: any) => {
                        this.progress.ref().complete();
                        this.notifications.error(
                            this.translator.instant('auth.change.notifications.title'),
                            error.message
                        );
                        this.form.reset();
                }
            );
    }

    private defineForm(): FormGroup {
        return new FormGroup ({
            'submitted': new FormControl(false),
            'password': new FormControl( null, [Validators.required, Validators.minLength(8)]),
            'password-confirm': new FormControl( null, [Validators.required, Validators.minLength(8)])
        }, {validators: [CustomValidators.passwordsMatch]});
    }

}
