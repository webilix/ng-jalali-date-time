import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgJalaliDateTimeComponent } from './ng-jalali-date-time.component';

describe('JalaliDateTimeComponent', () => {
    let component: NgJalaliDateTimeComponent;
    let fixture: ComponentFixture<NgJalaliDateTimeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgJalaliDateTimeComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgJalaliDateTimeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
