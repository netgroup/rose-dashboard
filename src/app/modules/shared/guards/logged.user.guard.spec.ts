import { LoggedUserGuard } from '@modules/shared/guards/logged.user.guard';
import { StorageService } from '@services/storage/storage.service';
import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { ApplicationReducers } from '@services/store/store.reducers';

describe('LoggedUserGuard', () => {
    let loggedUserGuard: LoggedUserGuard;
    const routeMock: any = { snapshot: {}};
    const routeStateMock: any = { snapshot: {}, url: '/users'};
    const routerMock = { navigate: jasmine.createSpy('navigate') };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot(ApplicationReducers),
            ],
            providers: [
                StorageService,
                LoggedUserGuard,
                { provide: Router, useValue: routerMock },
            ]
        });
    }));

    beforeEach(() => {
        loggedUserGuard = TestBed.get(LoggedUserGuard);
    });

    it('should be created', () => expect(loggedUserGuard).toBeTruthy());

    it('should redirect an unauthenticated user to the login route', () => {
        localStorage.clear();
        return loggedUserGuard.canActivate(routeMock, routeStateMock)
            .subscribe((result) => {
                expect(result).toEqual(false);
                expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/signin']);
            });
    });

});
