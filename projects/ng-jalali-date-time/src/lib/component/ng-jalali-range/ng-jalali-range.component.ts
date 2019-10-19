import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { JalaliLocale } from '../../shared/jalali.locale';
import { NgJalaliRangeValueInterface } from './ng-jalali-range.interface';
import { JalaliCalendarInterface } from '../../shared/jalali.interface';
import { NgJalaliDateTimeService } from '../../ng-jalali-date-time.service';
import { NgJalaliDateTimeConfigInterface, NgJalaliDateTimeCssInterface } from '../../ng-jalali-date-time.interface';

@Component({
    templateUrl: './ng-jalali-range.component.html',
    styleUrls: ['./ng-jalali-range.component.css', '../../shared/ng-jalali.style.css'],
    animations: [
        trigger('calendar', [
            state('init', style({ opacity: 1, transform: 'translateY(0) scaleY(1)' })),
            transition('void => *', [style({ opacity: 0, transform: 'translateY(-45%) scaleY(0)' }), animate(100)]),
            transition('* => void', animate(100, style({ opacity: 0, transform: 'translateY(-45%) scaleY(0)' })))
        ])
    ]
})
export class NgJalaliRangeComponent implements OnInit {
    public form: FormGroup;
    public name: string;
    public config: NgJalaliDateTimeConfigInterface;
    public css: NgJalaliDateTimeCssInterface;

    public value: NgJalaliRangeValueInterface;
    public label: string;

    public custom: { from: string; to: string };
    public fMonth: string;
    public fCalendar: JalaliCalendarInterface;
    public fTitle: string;

    public tMonth: string;
    public tCalendar: JalaliCalendarInterface;
    public tTitle: string;

    public show: boolean = false;
    public random: string = Date.now().toString();
    public today: string = '';
    public reset: boolean = false;

    public jalaliLocale = new JalaliLocale();
    public week: string[] = this.jalaliLocale.dayNames;

    @Output() changed = new EventEmitter<NgJalaliRangeValueInterface>();

    constructor(private readonly service: NgJalaliDateTimeService) {}

    ngOnInit() {
        this.custom = { from: this.value.range ? this.value.from : '', to: this.value.range ? this.value.to : '' };
        this.setCustomTitle();

        this.fMonth = this.value.range ? this.value.from.substr(0, 7) : this.service.jalali.now({ format: 'Y-M' });
        this.fCalendar = this.service.getCalendar(this.fMonth);

        this.tMonth = this.value.range ? this.value.to.substr(0, 7) : this.service.jalali.now({ format: 'Y-M' });
        this.tCalendar = this.service.getCalendar(this.tMonth);

        this.today = this.service.jalali.now({ format: 'Y-M-D' });

        const validators: any[] = [];
        if (this.config.required) validators.push(this.validate.bind(this));

        this.form.addControl(this.name, new FormControl(this.value));
        this.form.addControl(this.name + '-title', new FormControl('', validators));
        this.setTitle();
    }

    validate() {
        return this.value.range ? null : { required: true };
    }

    showCalendar(show: boolean) {
        const input: HTMLInputElement = document.querySelector('#input' + this.random);
        input.blur();

        if (this.reset) {
            this.reset = false;
            show = false;
        }

        this.show = show;
        if (this.show) {
            this.setCustomTitle();
            this.form.get(this.name + '-title').markAsUntouched();
            if (this.value.range) {
                this.fMonth = this.value.from.substr(0, 7);
                this.fCalendar = this.service.getCalendar(this.fMonth);
                this.tMonth = this.value.to.substr(0, 7);
                this.tCalendar = this.service.getCalendar(this.tMonth);
            } else {
                this.fMonth = this.service.jalali.now({ format: 'Y-M' });
                this.fCalendar = this.service.getCalendar(this.fMonth);
                this.tMonth = this.service.jalali.now({ format: 'Y-M' });
                this.tCalendar = this.service.getCalendar(this.tMonth);
                this.setCustomDate('', '');
            }
        } else this.form.get(this.name + '-title').markAsTouched();
    }

    changeMonth(type: string, change: number) {
        let Y: string = '';
        let M: string = '';

        switch (type) {
            case 'from':
                [Y, M] = this.fMonth.split('-');
                break;
            case 'to':
                [Y, M] = this.tMonth.split('-');
                break;
        }

        let year: number = Number(Y);
        let month: number = Number(M) + change;

        while (month > 12) {
            month -= 12;
            year++;
        }

        while (month < 1) {
            month += 12;
            year--;
        }

        switch (type) {
            case 'from':
                this.fMonth = year.toString() + '-' + (month < 10 ? '0' : '') + month.toString();
                this.fCalendar = this.service.getCalendar(this.fMonth);
                break;
            case 'to':
                this.tMonth = year.toString() + '-' + (month < 10 ? '0' : '') + month.toString();
                this.tCalendar = this.service.getCalendar(this.tMonth);
                break;
        }
    }

    setTitle() {
        this.form.get(this.name).setValue(this.value);

        const title: string = this.service.getRangeTitle(this.value);
        this.form.get(this.name + '-title').setValue(title);
    }

    setCustomTitle() {
        this.fTitle = this.custom.from
            ? this.service.jalali.toTitle(this.service.jalaliToGregorian(this.custom.from))
            : this.jalaliLocale.notSpecified;
        this.tTitle = this.custom.to
            ? this.service.jalali.toTitle(this.service.jalaliToGregorian(this.custom.to))
            : this.jalaliLocale.notSpecified;
    }

    setCustomDate(from: string, to: string) {
        if (from && to && from >= to) return;
        this.custom.from = from;
        this.custom.to = to;
        this.setCustomTitle();
    }

    setRange(type) {
        const format = { format: 'Y-M-D' };

        let from: string = '';
        let to: string = '';
        let date: Date = null;

        switch (type) {
            case 'current-week':
                date = this.service.jalaliToGregorian(this.today);
                while (date.getDay() !== 6) {
                    date = new Date(date.getTime() - 24 * 3600 * 1000);
                }

                from = this.service.jalali.toString(date, format);
                to = this.service.jalali.toString(new Date(date.getTime() + 6 * 24 * 3600 * 1000), format);
                break;
            case 'current-month':
                date = this.service.jalaliToGregorian(this.today.substr(0, 8) + '01');
                const days = this.service.getDayInMonth(this.today.substr(0, 7));
                from = this.service.jalali.toString(date, format);
                to = this.service.jalali.toString(new Date(date.getTime() + (days - 1) * 24 * 3600 * 1000), format);
                break;
            case 'last-7days':
                date = this.service.jalaliToGregorian(this.today);
                from = this.service.jalali.toString(new Date(date.getTime() - 6 * 24 * 3600 * 1000), format);
                to = this.service.jalali.toString(date, format);
                break;
            case 'last-30days':
                date = this.service.jalaliToGregorian(this.today);
                from = this.service.jalali.toString(new Date(date.getTime() - 29 * 24 * 3600 * 1000), format);
                to = this.service.jalali.toString(date, format);
                break;
            case 'next-7days':
                date = this.service.jalaliToGregorian(this.today);
                from = this.service.jalali.toString(date, format);
                to = this.service.jalali.toString(new Date(date.getTime() + 6 * 24 * 3600 * 1000), format);
                break;
            case 'next-30days':
                date = this.service.jalaliToGregorian(this.today);
                from = this.service.jalali.toString(date, format);
                to = this.service.jalali.toString(new Date(date.getTime() + 29 * 24 * 3600 * 1000), format);
                break;
            case 'custom':
                from = this.custom.from;
                to = this.custom.to;
                break;
            case 'reset':
            default:
                break;
        }

        this.custom = { from, to };
        this.value = this.service.getRangeValue(from, to);
        this.setTitle();
        this.showCalendar(false);
        this.changed.emit(this.value.range ? this.value : null);
        this.form.get(this.name + '-title').updateValueAndValidity();
    }
}
