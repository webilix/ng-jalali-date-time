import { Pipe, PipeTransform } from '@angular/core';

import { NgJalaliDateTimeService } from '../ng-jalali-date-time.service';

@Pipe({ name: 'jalaliTitle' })
export class NgJalaliTitlePipe implements PipeTransform {
    constructor(private readonly service: NgJalaliDateTimeService) {}

    transform(value: string | number, format?: string) {
        let date: Date;

        switch (typeof value) {
            case 'number':
                date = new Date(value * 1000);
                break;

            case 'string':
                if (!this.service.checkDate(value)) return '';
                date = this.service.jalaliToGregorian(value);
                break;
        }

        format = format ? format : 'W، D N Y';
        return this.service.jalali.toTitle(date, { format });
    }
}
