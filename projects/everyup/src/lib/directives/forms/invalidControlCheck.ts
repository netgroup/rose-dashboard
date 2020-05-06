import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AbstractControl, ControlContainer, FormGroupDirective} from '@angular/forms';

import {merge, Subscription} from 'rxjs';

@Directive({
    selector: '[invalidControlCheck]'
})
export class InvalidControlCheckDirective implements OnInit, OnDestroy {
    @Input() invalidControlCheck: string;

    control: AbstractControl;
    controlSubscription: Subscription;

    constructor(private group: ControlContainer,
                private element: ElementRef,
                private renderer: Renderer2) {
    }

    get form() {
        return this.group.formDirective ? (this.group.formDirective as FormGroupDirective).form : null;
    }

    ngOnInit() {
        this.control = this.form.get(this.invalidControlCheck);

        this.controlSubscription = merge(
            this.control.statusChanges,
            this.form.get('submitted').valueChanges
        ).subscribe(() => {
            this.control.invalid && this.form.get('submitted').value
                ? this.renderer.addClass(this.element.nativeElement, 'invalid')
                : this.renderer.removeClass(this.element.nativeElement, 'invalid');
        });
    }

    ngOnDestroy() {
        this.controlSubscription.unsubscribe();
        this.controlSubscription = null;
    }
}
