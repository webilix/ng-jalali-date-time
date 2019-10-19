import { Component, OnInit } from '@angular/core';

import { JalaliDateTime } from 'jalali-date-time';

import {
    NgJalaliDateTimeValueInterface,
    NgJalaliMonthValueInterface,
    NgJalaliRangeValueInterface
} from '../../projects/ng-jalali-date-time/src/public-api';

interface JalaliValuesInterface {
    date: NgJalaliDateTimeValueInterface;
    month: NgJalaliMonthValueInterface;
    range: NgJalaliRangeValueInterface;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public jalali = JalaliDateTime();
    public values: JalaliValuesInterface = { date: null, month: null, range: null };

    public jalaliDefault: { date: string; time: string; next: string; timestamp: number };
    public jalaliDate: string;
    public jalaliTime: string;
    public jalaliTimestamp: number;
    public jalaliMonth: string;
    public jalaliRange: string;

    ngOnInit() {
        this.jalaliDefault = {
            date: this.jalali.now({ format: 'Y-M-D' }),
            time: this.jalali.now({ format: 'H:I:S' }),
            next: this.jalali.toString(new Date(Date.now() + 12 * 24 * 3600 * 1000), { format: 'Y-M-D' }),
            timestamp: Math.floor(Date.now() / 1000)
        };

        this.jalaliDate = this.jalaliDefault.date;
        this.jalaliTime = this.jalaliDefault.time;
        this.jalaliTimestamp = this.jalaliDefault.timestamp;
        this.jalaliMonth = this.jalaliDefault.date.substr(0, 7);
        this.jalaliRange = this.jalaliDefault.date + '|' + this.jalaliDefault.next;
    }

    setDate(date: NgJalaliDateTimeValueInterface) {
        this.values.date = date;
        this.jalaliDate = date ? date.jalali : this.jalaliDefault.date;
        this.jalaliTime = date ? date.time : this.jalaliDefault.time;
        this.jalaliTimestamp = date ? date.timestamp : this.jalaliDefault.timestamp;
    }

    setMonth(month: NgJalaliMonthValueInterface) {
        this.values.month = month;
        this.jalaliMonth = month ? month.month : this.jalaliDefault.date.substr(0, 7);
    }

    setRange(range: NgJalaliRangeValueInterface) {
        this.values.range = range;
        this.jalaliRange = range ? range.range : this.jalaliDefault.date + '|' + this.jalaliDefault.next;
    }
}
