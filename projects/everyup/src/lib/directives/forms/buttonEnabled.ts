import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlContainer, FormGroupDirective} from '@angular/forms';
import {Subscription} from 'rxjs';

import {ButtonComponent, ButtonStates} from '@modules/shared/components/button/button.component';

@Directive({
    selector: '[buttonEnabled]'
})
export class ButtonEnabledDirective implements OnInit, OnDestroy {
    @Input() controlName: string;

    formSubscription: Subscription;

    constructor(private group: ControlContainer,
                private button: ButtonComponent) {

    }

    get form() {
        return this.group.formDirective ? (this.group.formDirective as FormGroupDirective).form : null;
    }

    ngOnInit() {
        this.button.state = ButtonStates.DISABLED;
        this.formSubscription = this.form.statusChanges.subscribe(() => this.handleButtonAvailability());

        this.handleButtonAvailability();
    }

    ngOnDestroy() {
        if (this.formSubscription) {
            this.formSubscription.unsubscribe();
            this.formSubscription = null;
        }
    }

    private handleButtonAvailability(): void {
        this.button.state = this.form.dirty && this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
    }
}
