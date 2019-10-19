import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { NgJalaliDateTimeService } from './ng-jalali-date-time.service';
import { MaterialModule } from './shared/material.module';

import { NgJalaliDateTimeComponent } from './component/ng-jalali-date-time/ng-jalali-date-time.component';
import { NgJalaliDateTimeDirective } from './component/ng-jalali-date-time/ng-jalali-date-time.directive';
import { NgJalaliMonthComponent } from './component/ng-jalali-month/ng-jalali-month.component';
import { NgJalaliMonthDirective } from './component/ng-jalali-month/ng-jalali-month.directive';
import { NgJalaliRangeComponent } from './component/ng-jalali-range/ng-jalali-range.component';
import { NgJalaliRangeDirective } from './component/ng-jalali-range/ng-jalali-range.directive';

import { NgJalaliDatePipe } from './pipes/ng-jalali-date.pipe';
import { NgJalaliTimestampPipe } from './pipes/ng-jalali-timestamp.pipe';
import { NgJalaliTitlePipe } from './pipes/ng-jalali-title.pipe';
import { NgJalaliFullPipe } from './pipes/ng-jalali-full.pipe';
import { NgJalaliMonthPipe } from './pipes/ng-jalali-month.pipe';
import { NgJalaliRangePipe } from './pipes/ng-jalali-range.pipe';
import { NgJalaliDaysPipe } from './pipes/ng-jalali-days.pipe';

@NgModule({
    declarations: [
        NgJalaliDateTimeComponent,
        NgJalaliDateTimeDirective,
        NgJalaliMonthComponent,
        NgJalaliMonthDirective,
        NgJalaliRangeComponent,
        NgJalaliRangeDirective,

        NgJalaliDatePipe,
        NgJalaliTimestampPipe,
        NgJalaliTitlePipe,
        NgJalaliFullPipe,
        NgJalaliMonthPipe,
        NgJalaliRangePipe,
        NgJalaliDaysPipe
    ],
    providers: [NgJalaliDateTimeService],
    imports: [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, MaterialModule],
    exports: [
        NgJalaliDateTimeDirective,
        NgJalaliMonthDirective,
        NgJalaliRangeDirective,

        NgJalaliDatePipe,
        NgJalaliTimestampPipe,
        NgJalaliTitlePipe,
        NgJalaliFullPipe,
        NgJalaliMonthPipe,
        NgJalaliRangePipe,
        NgJalaliDaysPipe
    ],
    entryComponents: [NgJalaliDateTimeComponent, NgJalaliMonthComponent, NgJalaliRangeComponent]
})
export class NgJalaliDateTimeModule {}
