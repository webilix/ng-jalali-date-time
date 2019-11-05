import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { NgJalaliMonthValueInterface } from './ng-jalali-month.interface';
import { NgJalaliDateTimeService } from '../../ng-jalali-date-time.service';
import { NgJalaliDateTimeConfigInterface, NgJalaliDateTimeCssInterface } from '../../ng-jalali-date-time.interface';
import { JalaliLocale } from '../../shared/jalali.locale';

@Component({
    templateUrl: './ng-jalali-month.component.html',
    styleUrls: ['./ng-jalali-month.component.css', '../../shared/ng-jalali.style.css'],
    animations: [
        trigger('calendar', [
            state('init', style({ opacity: 1, transform: 'translateY(0) scaleY(1)' })),
            transition('void => *', [style({ opacity: 0, transform: 'translateY(-45%) scaleY(0)' }), animate(100)]),
            transition('* => void', animate(100, style({ opacity: 0, transform: 'translateY(-45%) scaleY(0)' })))
        ])
    ]
})
export class NgJalaliMonthComponent implements OnInit {
    public form: FormGroup;
    public name: string;
    public appearance: string;
    public config: NgJalaliDateTimeConfigInterface;
    public css: NgJalaliDateTimeCssInterface;

    public value: NgJalaliMonthValueInterface;
    public label: string;

    public show: boolean = false;
    public random: string = Date.now().toString();
    public month: string = '';
    public year: string = '';
    public current: string = '';
    public reset: boolean = false;

    public jalaliLocale = new JalaliLocale();
    public calendar: { month: string; title: string }[][] = [
        [
            { month: '01', title: this.jalaliLocale.monthNames[0] },
            { month: '02', title: this.jalaliLocale.monthNames[1] },
            { month: '03', title: this.jalaliLocale.monthNames[2] }
        ],
        [
            { month: '04', title: this.jalaliLocale.monthNames[3] },
            { month: '05', title: this.jalaliLocale.monthNames[4] },
            { month: '06', title: this.jalaliLocale.monthNames[5] }
        ],
        [
            { month: '07', title: this.jalaliLocale.monthNames[6] },
            { month: '08', title: this.jalaliLocale.monthNames[7] },
            { month: '09', title: this.jalaliLocale.monthNames[8] }
        ],
        [
            { month: '10', title: this.jalaliLocale.monthNames[9] },
            { month: '11', title: this.jalaliLocale.monthNames[10] },
            { month: '12', title: this.jalaliLocale.monthNames[11] }
        ]
    ];

    @Output() changed = new EventEmitter<NgJalaliMonthValueInterface>();

    constructor(private readonly service: NgJalaliDateTimeService) {}

    ngOnInit() {
        this.year = this.value.month ? this.value.month.substr(0, 4) : this.service.jalali.now({ format: 'Y' });
        this.current = this.service.jalali.now({ format: 'Y-M' });

        const validators: any[] = [];
        if (this.config.required) validators.push(this.validate.bind(this));

        this.form.addControl(this.name, new FormControl(this.value));
        this.form.addControl(this.name + '-title', new FormControl('', validators));
        this.setTitle();
    }

    validate() {
        return this.value.month ? null : { required: true };
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
            this.year = this.value.month ? this.value.month.substr(0, 4) : this.service.jalali.now({ format: 'Y' });
        } else this.form.get(this.name + '-title').markAsTouched();
    }

    changeYear(change: number) {
        const year: number = Number(this.year) + change;
        this.year = year < 1000 ? '1000' : year.toString();
    }

    setTitle() {
        this.form.get(this.name).setValue(this.value);

        const title: string = this.service.getMonthTitle(this.value);
        this.form.get(this.name + '-title').setValue(title);
    }

    setMonth(month: string) {
        this.value = this.service.getMonthValue(month ? this.year + '-' + month : '');
        this.setTitle();
        this.showCalendar(false);
        this.changed.emit(this.value.month ? this.value : null);
        this.form.get(this.name + '-title').updateValueAndValidity();
    }
}
