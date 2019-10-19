import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgJalaliRangeComponent } from './ng-jalali-range.component';

describe('JalaliRangeComponent', () => {
    let component: NgJalaliRangeComponent;
    let fixture: ComponentFixture<NgJalaliRangeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgJalaliRangeComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgJalaliRangeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
