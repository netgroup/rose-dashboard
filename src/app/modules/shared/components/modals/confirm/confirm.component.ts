import {Component, EventEmitter, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {ButtonStates} from '@modules/shared/components/button/button.component';

@Component({
    selector: 'app-modals-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {
    action: EventEmitter<string>;

    title: string;
    message: string;

    buttons: {
        dismiss: string;
        confirm: string;
    };

    states: {
        dismiss: ButtonStates;
        confirm: ButtonStates;
    };

    constructor(public modal: NgbActiveModal) {
        this.action = new EventEmitter<string>();

        this.buttons = {
            dismiss: '',
            confirm: ''
        };

        this.states = {
            dismiss: ButtonStates.ACTIVE,
            confirm: ButtonStates.ACTIVE
        };
    }

    ngOnInit() {

    }

    startLoading(button: string = 'confirm') {
        this.states[button] = ButtonStates.LOADING;
    }

    endLoading(button: string = 'confirm') {
        this.states[button] = ButtonStates.ACTIVE;
    }
}
