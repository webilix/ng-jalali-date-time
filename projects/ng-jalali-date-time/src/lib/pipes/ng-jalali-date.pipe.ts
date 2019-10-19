import { Pipe, PipeTransform } from '@angular/core';

import { NgJalaliDateTimeService } from '../ng-jalali-date-time.service';

@Pipe({ name: 'jalaliDate' })
export class NgJalaliDatePipe implements PipeTransform {
    constructor(private readonly service: NgJalaliDateTimeService) {}

    transform(value: string) {
        const split: string[] = value.split(' ');
        const dateValue: string = split[0];
        const timeValue: string = split[1] && this.service.checkTime(split[1]) ? split[1] : '00:00:00';

        if (!this.service.checkDate(dateValue)) return '';
        const date: Date = this.service.jalaliToGregorian(dateValue, timeValue);
        return date.toString();
    }
}
