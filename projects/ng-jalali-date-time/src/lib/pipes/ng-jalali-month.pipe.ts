import { Pipe, PipeTransform } from '@angular/core';

import { NgJalaliDateTimeService } from '../ng-jalali-date-time.service';

@Pipe({ name: 'jalaliMonth' })
export class NgJalaliMonthPipe implements PipeTransform {
    constructor(private readonly service: NgJalaliDateTimeService) {}

    transform(value: string) {
        if (!this.service.checkMonth(value)) return '';
        const date: Date = this.service.jalaliToGregorian(value + '-01');
        return this.service.jalali.toTitle(date, { format: 'N Y' });
    }
}
