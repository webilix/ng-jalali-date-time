import { Injectable } from '@angular/core';
import { JalaliDateTime } from 'jalali-date-time';

import { JalaliLocale } from './shared/jalali.locale';
import { JalaliCalendarInterface, JalaliWeekInterface, JalaliDayInterface } from './shared/jalali.interface';
import { NgJalaliDateTimeValueInterface } from './component/ng-jalali-date-time/ng-jalali-date-time.interface';
import { NgJalaliMonthValueInterface } from './component/ng-jalali-month/ng-jalali-month.interface';
import { NgJalaliRangeValueInterface } from './component/ng-jalali-range/ng-jalali-range.interface';
import { NgJalaliDateTimeCssInterface } from './ng-jalali-date-time.interface';

@Injectable()
export class NgJalaliDateTimeService {
    public jalali = JalaliDateTime({
        timezone: 'Asia/Tehran',
        locale: 'en',
        dateFormat: 'Y-M-D',
        timeFormat: 'H:I:S',
        titleFormat: 'W، d N Y',
        fullTextFormat: 'W، d N Y H:I:S'
    });

    public jalaliLocale = new JalaliLocale();

    constructor() {}

    checkDate(date: string): string {
        if (typeof date !== 'string' || date.length !== 10) return '';
        if (!date.match(/([0-9]{4}-[0-9]{2}-[0-9]{2})/)) return '';

        const [year, month, day] = date.split('-');
        if (Number(year) < 1000 || Number(year) > 4000) return '';
        if (Number(month) < 1 || Number(month) > 12) return '';
        if (Number(day) < 1 || Number(day) > 31) return '';
        return date;
    }

    checkTime(time: string): string {
        if (typeof time !== 'string' || time.length !== 8) return '';
        if (!time.match(/([0-9]{2}:[0-9]{2}:[0-9]{2})/)) return '';

        const [hour, minute, second] = time.split('-');
        if (Number(hour) < 0 || Number(hour) > 23) return '';
        if (Number(minute) < 0 || Number(minute) > 59) return '';
        if (Number(second) < 0 || Number(second) > 59) return '';
        return time;
    }

    checkMonth(date: string): string {
        if (typeof date !== 'string' || date.length !== 7) return '';
        if (!date.match(/([0-9]{4}-[0-9]{2})/)) return '';

        const [year, month] = date.split('-');
        if (Number(year) < 1000 || Number(year) > 4000) return '';
        if (Number(month) < 1 || Number(month) > 12) return '';
        return date;
    }

    private setFontCSS(css: Object, font: string): Object {
        return { ...css, fontFamily: font };
    }

    checkCSS(css: NgJalaliDateTimeCssInterface): NgJalaliDateTimeCssInterface {
        if (!css) css = {};
        css.font = css.font ? css.font : "Roboto, 'Helvetica Neue', sans-serif";

        css.field = css.field ? css.field : {};
        css.input = this.setFontCSS(css.input ? css.input : {}, css.font);
        css.reset = css.reset ? css.reset : {};
        css.box = css.box ? css.box : {};
        css.arrow = css.arrow ? css.arrow : {};
        css.header = this.setFontCSS(css.header ? css.header : {}, css.font);
        css.item = this.setFontCSS(css.item ? css.item : {}, css.font);
        css.selected = css.selected ? css.selected : {};
        css.selected = { ...css.item, ...css.selected };
        css.current = css.current ? css.current : {};
        css.current = { ...css.item, ...css.current };

        if (!css.date) css.date = {};
        css.date.name = this.setFontCSS(css.date.name ? css.date.name : {}, css.font);
        css.date.time = this.setFontCSS(css.date.time ? css.date.time : {}, css.font);

        if (!css.month) css.month = {};

        if (!css.range) css.range = {};
        css.range.tool = this.setFontCSS(css.range.tool ? css.range.tool : {}, css.font);
        css.range.custom = css.range.custom ? css.range.custom : {};
        css.range.custom = { ...css.range.tool, ...css.range.custom };
        css.range.confirm = css.range.confirm ? css.range.confirm : {};
        css.range.confirm = { ...css.range.tool, ...css.range.custom, ...css.range.confirm };
        css.range.name = this.setFontCSS(css.range.name ? css.range.name : {}, css.font);
        css.range.date = this.setFontCSS(css.range.date ? css.range.date : {}, css.font);

        return css;
    }

    jalaliToGregorian(jalali: string, time?: string): Date {
        const gregorian: string = this.jalali.gregorian(jalali).date;
        return new Date(gregorian + ' ' + (this.checkTime(time) ? time : '12:00:00'));
    }

    getCalendar(month: string): JalaliCalendarInterface {
        const now: Date = this.jalaliToGregorian(month + '-01');
        const title = this.jalali.toFullText(now, { format: 'N Y' });

        let begin: Date = now;
        while (begin.getDay() !== 6) begin = new Date(begin.getTime() - 24 * 3600 * 1000);

        const weeks: JalaliWeekInterface[] = [];
        let days: JalaliDayInterface[] = [];
        let date = this.jalali.toDate(begin);
        while (date.substr(0, 7) <= month || days.length % 7 !== 0) {
            days.push({ date, month: date.substr(0, 7), day: Number(date.substr(8)) });
            if (days.length === 7) {
                weeks.push({ days });
                days = [];
            }

            begin = new Date(begin.getTime() + 24 * 3600 * 1000);
            date = this.jalali.toDate(begin);
        }

        return { month, title, weeks };
    }

    getDayInMonth(month: string): number {
        const [Y, M] = month.split('-');
        if (Number(M) < 7) return 31;
        if (Number(M) < 12) return 30;

        const date = this.jalaliToGregorian(month + '-30');
        const check = this.jalali.toString(date, { format: 'Y-M-D' }).substr(0, 7);
        return check === month ? 30 : 29;
    }

    /*
     * DATETIME
     */
    getDateTimeValue(jalali: string, time: string): NgJalaliDateTimeValueInterface {
        const gregorian: string = jalali ? this.jalali.gregorian(jalali).date : '';
        const date: Date = gregorian ? new Date(gregorian + ' ' + (time ? time : '12:00:00')) : null;
        const timestamp: number = gregorian ? Math.floor(date.getTime() / 1000) : null;
        time = time ? time : '00:00:00';

        return {
            jalali,
            gregorian,
            date,
            time,
            timestamp
        };
    }

    getDateTimeTitle(value: NgJalaliDateTimeValueInterface, time: boolean): string {
        if (!value.jalali) return '';
        return time ? this.jalali.toFullText(value.date) : this.jalali.toTitle(value.date);
    }

    /*
     * MONTH
     */
    getMonthValue(month: string): NgJalaliMonthValueInterface {
        let days: number = 0;
        const gregorian = { first: '', last: '' };

        if (month) {
            days = this.getDayInMonth(month);
            gregorian.first = this.jalali.gregorian(month + '-01').date;
            gregorian.last = this.jalali.gregorian(month + '-' + days.toString()).date;
        }

        return {
            month,
            days,
            gregorian
        };
    }

    getMonthTitle(value: NgJalaliMonthValueInterface): string {
        if (!value.month) return '';

        const date: Date = this.jalaliToGregorian(value.month + '-01');
        return this.jalali.toTitle(date, { format: 'N Y' });
    }

    /*
     * RANGE
     */
    getRangeValue(from: string, to: string): NgJalaliRangeValueInterface {
        let days: number = 0;
        let hours: number = 0;
        let minutes: number = 0;
        let seconds: number = 0;
        const gregorian = { from: '', to: '' };

        if (from && to) {
            gregorian.from = this.jalali.gregorian(from).date;
            gregorian.to = this.jalali.gregorian(to).date;

            const fTimestamp: number = Math.floor(new Date(gregorian.from + ' 12:00:00').getTime() / 1000);
            const tTimestamp: number = Math.floor(new Date(gregorian.to + ' 12:00:00').getTime() / 1000);
            days = Math.floor(Math.abs((tTimestamp - fTimestamp) / (24 * 3600))) + 1;
            hours = days * 24;
            minutes = hours * 60;
            seconds = minutes * 60;
        }

        return {
            range: from && to ? from + '|' + to : '',
            from,
            to,
            days,
            hours,
            minutes,
            seconds,
            gregorian
        };
    }

    getRangeTitle(value: NgJalaliRangeValueInterface): string {
        if (!value.from || !value.to) return '';

        const fDate = this.jalaliToGregorian(value.from);
        const tDate = this.jalaliToGregorian(value.to);

        const [fY, fM, fD] = value.from.split('-');
        const [tY, tM, tD] = value.to.split('-');

        let from: string = '';
        if (fY === tY && fM === tM) {
            from = this.jalali.toTitle(fDate, { format: 'd' });
        } else if (fY === tY) {
            from = this.jalali.toTitle(fDate, { format: 'd N' });
        } else {
            from = this.jalali.toTitle(fDate, { format: 'd N Y' });
        }
        return from + ' ' + this.jalaliLocale.rangeTo + ' ' + this.jalali.toTitle(tDate, { format: 'd N Y' });
    }
}
