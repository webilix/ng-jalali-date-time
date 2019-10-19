import { Pipe, PipeTransform } from '@angular/core';

import { NgJalaliDateTimeService } from '../ng-jalali-date-time.service';

@Pipe({ name: 'jalaliDays' })
export class NgJalaliDaysPipe implements PipeTransform {
    constructor(private readonly service: NgJalaliDateTimeService) {}

    transform(value: string) {
        const split: string[] = value.split('|');
        const dateValue1: string = split[0];
        const dateValue2: string = split[1] && this.service.checkDate(split[1]) ? split[1] : '';

        if (!this.service.checkDate(dateValue1)) return '';

        const time: string = this.service.jalali.now({ format: 'H:I:S' });
        const date1: Date = this.service.jalaliToGregorian(dateValue1, time);
        const date2: Date = dateValue2 ? this.service.jalaliToGregorian(dateValue2, time) : new Date();

        const second = Math.abs(Math.floor(date1.getTime() / 1000) - Math.floor(date2.getTime() / 1000));
        return (Math.floor(second / (24 * 3600)) + 1).toString();
    }
}
