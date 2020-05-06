import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';

import {ButtonComponent, ButtonStates} from './button.component';

describe('SharedModule::ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let title: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonComponent],
            providers: [{
                provide: ComponentFixtureAutoDetect, useValue: true
            }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        title = fixture.nativeElement.querySelector('#button-title');
    });

    it('should edit', () => {
        expect(component).toBeTruthy();
    });

    it('should change its appearance when its state changes to ACTIVE, LOADING and DISABLED', () => {
        component.state = ButtonStates.ACTIVE;
        expect(component.buttonClass).toEqual('active');

        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#button-loader')).toBeFalsy();

        component.state = ButtonStates.LOADING;
        expect(component.buttonClass).toEqual('loading');

        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#button-loader')).toBeTruthy();

        component.state = ButtonStates.DISABLED;
        expect(component.buttonClass).toEqual('disabled');

        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#button-loader')).toBeFalsy();
    });

    it('should starts with an empty title and this update itself when the input variable changes', () => {
        expect(title.textContent).toEqual('');

        component.title = 'Sample title';
        fixture.detectChanges();

        expect(title.textContent).toEqual('Sample title');
    });

    it('should change its title when the input variable changes', () => {
        const previousTitle = title.textContent;

        component.title = 'Sample title Again';
        expect(title.textContent).toEqual(previousTitle);

        fixture.detectChanges();
        expect(title.textContent).toEqual('Sample title Again');
    });
});
