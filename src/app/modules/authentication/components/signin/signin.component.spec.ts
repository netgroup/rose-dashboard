import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninComponent } from '@modules/authentication/components/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@modules/authentication/authentication.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { ButtonComponent } from '@modules/shared/components/button/button.component';
import { ErrorsSerializerPipe } from '@modules/shared/pipes/errors.serializer.pipe';
import { StoreModule } from '@ngrx/store';

import { Observable } from 'rxjs';

import { error } from 'util';
import { StorageService } from '@services/storage/storage.service';
import { ApplicationReducers } from '@services/store/store.reducers';
import { ApiModule } from '@modules/network/api.module';
import { SignoutUserGuard } from '@modules/authentication/guards/signout.user.guards';
import { CheckPasswordGuards } from '@modules/authentication/guards/check.password.guards';
import { RouterTestingModule } from '@angular/router/testing';

const notificationServiceSpy = jasmine.createSpyObj( 'NotificationService', ['success', 'error']);

const translations: any = { test: 'This is a test'};

class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return (translations);
    }
}

describe( 'Signin', () => {
    let fixture: ComponentFixture<SigninComponent>;
    let router: Router;

    function updateForm(userEmail, userPassword) {
        fixture.componentInstance.form.controls['username'].setValue(userEmail);
        fixture.componentInstance.form.controls['password'].setValue(userPassword);
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                TranslateModule.forRoot({
                    loader: {provide: TranslateLoader, useClass: FakeLoader},
                }),
                ApiModule,
                StoreModule.forRoot(ApplicationReducers),
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                AuthenticationService,
                SignoutUserGuard,
                CheckPasswordGuards,
                StorageService,
                NotificationsService,
                { provide: NotificationsService, useValue: notificationServiceSpy },
            ],
            declarations: [
                SigninComponent,
                ErrorsSerializerPipe,
                ButtonComponent
            ],
        });
        fixture = TestBed.createComponent(SigninComponent);
        router = TestBed.get(Router);
    }));

    it('should be created', () => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should open alert error if login is wrong', async(() => {

        updateForm('no@rose.it', '12345678');

        fixture.detectChanges();

        const button = fixture.debugElement.nativeElement.querySelector('app-button');

        button.click();

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(notificationServiceSpy.error).toHaveBeenCalled();
        });

    }));

    it('should redirect to / if login is right', () => {
        const navigateSpy = spyOn(router, 'navigate');
        updateForm('admin@rose.it', '12345678');

        fixture.detectChanges();

        const button = fixture.debugElement.nativeElement.querySelector('app-button');

        button.click();

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(navigateSpy).toHaveBeenCalledWith(['/']);
        });

    });

});
