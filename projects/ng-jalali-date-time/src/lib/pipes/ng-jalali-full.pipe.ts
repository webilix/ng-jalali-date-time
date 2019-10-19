import { Pipe, PipeTransform } from '@angular/core';

import { NgJalaliDateTimeService } from '../ng-jalali-date-time.service';

@Pipe({ name: 'jalaliFull' })
export class NgJalaliFullPipe implements PipeTransform {
    constructor(private readonly service: NgJalaliDateTimeService) {}

    transform(value: string | number, format?: string) {
        let date: Date;

        switch (typeof value) {
            case 'number':
                date = new Date(value * 1000);
                break;

            case 'string':
                const data = value.split(' ');
                const dateValue: string = data[0];
                const timeValue: string = data[1] ? data[1] : '00:00:00';

                if (!this.service.checkDate(dateValue)) return '';
                date = this.service.jalaliToGregorian(dateValue, timeValue);
                break;
        }

        format = format ? format : 'W، D N Y H:I:S';
        return this.service.jalali.toFullText(date, { format });
    }
}
