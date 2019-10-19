import {
    Directive,
    OnInit,
    ComponentFactoryResolver,
    ViewContainerRef,
    Input,
    ComponentRef,
    Output,
    EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { JalaliLocale } from '../../shared/jalali.locale';
import { NgJalaliDateTimeComponent } from './ng-jalali-date-time.component';
import { NgJalaliDateTimeService } from '../../ng-jalali-date-time.service';
import { NgJalaliDateTimeValueInterface } from './ng-jalali-date-time.interface';
import { NgJalaliDateTimeConfigInterface, NgJalaliDateTimeCssInterface } from '../../ng-jalali-date-time.interface';

@Directive({ selector: '[jalali-date-time]' })
export class NgJalaliDateTimeDirective implements OnInit {
    @Input() form: FormGroup;
    @Input() name: string;
    @Input() config: NgJalaliDateTimeConfigInterface;
    @Input() css: NgJalaliDateTimeCssInterface;

    @Input() date: string;
    @Input() time: string;
    @Input() label: string;

    public jalaliLocale = new JalaliLocale();

    @Output() changed = new EventEmitter<NgJalaliDateTimeValueInterface>();

    private component: ComponentRef<NgJalaliDateTimeComponent>;

    constructor(
        private readonly resolver: ComponentFactoryResolver,
        private readonly container: ViewContainerRef,
        private readonly service: NgJalaliDateTimeService
    ) {}

    ngOnInit() {
        if (!this.form) this.form = new FormGroup({});
        if (!this.name) this.name = 'jalali-date-time-' + Date.now().toString();

        if (!this.config) this.config = {};
        this.config.required = this.config.required ? true : false;
        this.config.min = this.service.checkDate(this.config.min) ? this.config.min : null;
        this.config.max = this.service.checkDate(this.config.max) ? this.config.max : null;
        this.config.reset = this.config.reset === false ? false : true;
        this.config.error = this.config.error ? this.config.error : this.jalaliLocale.required;
        this.config.time = this.config.time ? true : false;
        this.config.second = this.config.second ? true : false;

        this.css = this.service.checkCSS(this.css);

        this.date = this.service.checkDate(this.date);
        this.time = this.config.time ? this.service.checkTime(this.time) : '';
        this.label = this.label ? this.label : this.jalaliLocale.date;

        const factory = this.resolver.resolveComponentFactory(NgJalaliDateTimeComponent);
        this.component = this.container.createComponent(factory);
        this.component.instance.form = this.form;
        this.component.instance.name = this.name;
        this.component.instance.config = this.config;
        this.component.instance.css = this.css;

        this.component.instance.value = this.service.getDateTimeValue(this.date, this.time);
        this.component.instance.label = this.label;

        this.component.instance.changed = this.changed;
    }
}
