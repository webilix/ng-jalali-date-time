import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgJalaliMonthComponent } from './ng-jalali-month.component';

describe('JalaliMonthComponent', () => {
    let component: NgJalaliMonthComponent;
    let fixture: ComponentFixture<NgJalaliMonthComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgJalaliMonthComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgJalaliMonthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
