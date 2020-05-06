import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgProgress } from '@ngx-progressbar/core';
import { finalize } from 'rxjs/operators';

import { Operator } from '@models/operators.model';
import { ButtonStates } from '@modules/shared/components/button/button.component';
import { CustomValidators } from '@everyup/validators/custom.validators';
import { AuthenticationService } from '@modules/authentication/authentication.service';
import { NotificationsService } from '@modules/notifications/notifications.service';

@Component({
    selector: 'app-auth-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
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
            username: null,
            password: null
        };
    }

    ngOnInit() {
        this.form.statusChanges.subscribe(() => this.submitState = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED);
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

        this.authentication.signin({
            username: this.form.get('username').value,
            password: this.form.get('password').value,
        }).pipe(
            finalize(() => this.submitState = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED)
        ).subscribe(
            (operator: Operator) => {
                this.router.navigate(['/']);
            },
            (error: any) => {
                this.progress.ref().complete();
                this.notifications.error(
                    this.translator.instant('auth.signin.notifications.title'),
                    error.message
                );
            }
        );
    }

    private defineForm(): FormGroup {
        return new FormGroup({
            submitted: new FormControl(false),
            username: new FormControl(null, [Validators.required]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }
}
