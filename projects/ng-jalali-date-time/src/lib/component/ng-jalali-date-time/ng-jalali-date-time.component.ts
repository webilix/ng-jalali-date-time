import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { JalaliLocale } from '../../shared/jalali.locale';
import { NgJalaliDateTimeValueInterface } from './ng-jalali-date-time.interface';
import { JalaliCalendarInterface } from '../../shared/jalali.interface';
import { NgJalaliDateTimeService } from '../../ng-jalali-date-time.service';
import { NgJalaliDateTimeConfigInterface, NgJalaliDateTimeCssInterface } from '../../ng-jalali-date-time.interface';

@Component({
    templateUrl: './ng-jalali-date-time.component.html',
    styleUrls: ['./ng-jalali-date-time.component.css', '../../shared/ng-jalali.style.css'],
    animations: [
        trigger('calendar', [
            state('init', style({ opacity: 1, transform: 'translateY(0) scaleY(1)' })),
            transition('void => *', [style({ opacity: 0, transform: 'translateY(-45%) scaleY(0)' }), animate(100)]),
            transition('* => void', animate(100, style({ opacity: 0, transform: 'translateY(-45%) scaleY(0)' })))
        ])
    ]
})
export class NgJalaliDateTimeComponent implements OnInit {
    public form: FormGroup;
    public name: string;
    public appearance: string;
    public config: NgJalaliDateTimeConfigInterface;
    public css: NgJalaliDateTimeCssInterface;

    public value: NgJalaliDateTimeValueInterface;
    public label: string;

    public show: boolean = false;
    public random: string = Date.now().toString();
    public month: string = '';
    public calendar: JalaliCalendarInterface;
    public today: string = '';
    public reset: boolean = false;

    public jalaliLocale = new JalaliLocale();
    public week: string[] = this.jalaliLocale.dayNames;

    @Output() changed = new EventEmitter<NgJalaliDateTimeValueInterface>();

    constructor(private readonly service: NgJalaliDateTimeService) {}

    ngOnInit() {
        this.month = this.value.jalali ? this.value.jalali.substr(0, 7) : this.service.jalali.now({ format: 'Y-M' });
        this.calendar = this.service.getCalendar(this.month);
        this.today = this.service.jalali.now({ format: 'Y-M-D' });

        const validators: any[] = [];
        if (this.config.required) validators.push(this.validate.bind(this));

        this.form.addControl(this.name, new FormControl(this.value));
        this.form.addControl(this.name + '-title', new FormControl('', validators));
        this.setTitle();
    }

    validate() {
        return this.value.jalali ? null : { required: true };
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
            this.form.get(this.name + '-title').markAsUntouched();
            if (!this.value.jalali) this.value.time = '00:00:00';
            this.month = this.value.jalali
                ? this.value.jalali.substr(0, 7)
                : this.service.jalali.now({ format: 'Y-M' });
            this.calendar = this.service.getCalendar(this.month);
        } else this.form.get(this.name + '-title').markAsTouched();
    }

    changeMonth(change: number) {
        const [Y, M] = this.month.split('-');
        let year = Number(Y);
        let month = Number(M) + change;

        while (month > 12) {
            month -= 12;
            year++;
        }

        while (month < 1) {
            month += 12;
            year--;
        }

        this.month = year.toString() + '-' + (month < 10 ? '0' : '') + month.toString();
        this.calendar = this.service.getCalendar(this.month);
    }

    setTitle() {
        this.form.get(this.name).setValue(this.value);

        const title: string = this.service.getDateTimeTitle(this.value, this.config.time);
        this.form.get(this.name + '-title').setValue(title);
    }

    setDate(jalali: string) {
        this.value = this.service.getDateTimeValue(jalali, this.value.time);
        this.setTitle();
        this.showCalendar(false);
        this.changed.emit(this.value.jalali ? this.value : null);
        this.form.get(this.name + '-title').updateValueAndValidity();
    }

    getTime(type: string): number {
        if (!this.value.time) return 0;

        let value: number = 0;
        switch (type) {
            case 'H':
                value = Number(this.value.time.substr(0, 2));
                break;
            case 'I':
                value = Number(this.value.time.substr(3, 2));
                break;
            case 'S':
                value = Number(this.value.time.substr(6, 2));
                break;
        }
        return isNaN(value) ? 0 : value;
    }

    setTime() {
        const hour: HTMLInputElement = document.querySelector('#hour' + this.random);
        const minute: HTMLInputElement = document.querySelector('#minute' + this.random);
        const second: HTMLInputElement = document.querySelector('#second' + this.random);

        let H: number = Math.floor(Number(hour.value));
        H = isNaN(H) || H < 0 || H > 23 ? 0 : H;
        hour.value = H.toString();

        let I: number = Math.floor(Number(minute.value));
        I = isNaN(I) || I < 0 || I > 59 ? 0 : I;
        minute.value = I.toString();

        let S: number = Math.floor(Number(second.value));
        S = isNaN(S) || S < 0 || S > 59 ? 0 : S;
        second.value = this.config.second ? S.toString() : '00';

        const time: string =
            (H < 10 ? '0' : '') +
            H.toString() +
            ':' +
            ((I < 10 ? '0' : '') + I.toString()) +
            ':' +
            ((S < 10 ? '0' : '') + S.toString());

        this.value = this.service.getDateTimeValue(this.value.jalali, time);
        this.setTitle();
        this.changed.emit(this.value.jalali ? this.value : null);
        this.form.get(this.name + '-title').updateValueAndValidity();
    }
}
