import { Pipe, PipeTransform } from '@angular/core';

import { NgJalaliDateTimeService } from '../ng-jalali-date-time.service';

@Pipe({ name: 'jalaliRange' })
export class NgJalaliRangePipe implements PipeTransform {
    constructor(private readonly service: NgJalaliDateTimeService) {}

    transform(value: string) {
        const data: string[] = value.split('|');

        const from: string = data[0];
        const to: string = data[1] ? data[1] : '';
        if (!this.service.checkDate(from) || !this.service.checkDate(to)) return '';
        return this.service.getRangeTitle(this.service.getRangeValue(from, to));
    }
}
