import {Component, Input, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';

export enum ButtonStates {
    LOADING,
    DISABLED,
    ACTIVE
}

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
    buttonTitle: string;
    buttonClass: string;
    buttonBaseClass: string;

    buttonState: ButtonStates;

    @ViewChild('button') buttonInstance: ElementRef;

    @Input()
    set class(classes: string) {
        classes.split(' ').forEach(className => this.renderer.addClass(this.buttonInstance.nativeElement, className));
    }

    @Input()
    set type(type: string) {
        if (type === 'empty' || type === 'clear') {
            this.buttonBaseClass = type;
        } else {
            this.buttonBaseClass = 'filled';
        }
    }

    @Input()
    set title(title: string) {
        this.buttonTitle = title;
    }

    @Input()
    set state(state: ButtonStates) {
        this.buttonState = state;

        switch (state) {
            case ButtonStates.ACTIVE:
                this.buttonClass = 'active';

                break;
            case ButtonStates.DISABLED:
                this.buttonClass = 'disabled';

                break;
            case ButtonStates.LOADING:
                this.buttonClass = 'loading';

                break;
        }
    }

    get state(): ButtonStates {
        return this.state;
    }

    @Input()
    set loading(isLoading: boolean) {
        this.state = isLoading ? ButtonStates.LOADING : ButtonStates.ACTIVE;
    }

    get loading(): boolean {
        return this.state === ButtonStates.LOADING;
    }


    constructor(private renderer: Renderer2) {

    }

    ngOnInit() {
        this.buttonClass = this.buttonClass || 'active';
        this.buttonBaseClass = this.buttonBaseClass || 'filled';
    }
}
