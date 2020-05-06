import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '@modules/authentication/authentication.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-activate',
    templateUrl: './activate.component.html',
    styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
    status: 'activating' | 'success' | 'error';

    constructor(private authentication: AuthenticationService,
                private route: ActivatedRoute) {
        this.status = 'activating';
    }

    ngOnInit() {
        if (!this.route.snapshot.queryParamMap.has('token')) {
            this.status = 'error';
        }

        this.authentication
            .activate(this.route.snapshot.queryParamMap.get('token'))
            .subscribe(
                () => this.status = 'success',
                error => this.status = 'error'
            );
    }

}
