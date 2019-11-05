import {
    Directive,
    OnInit,
    Input,
    ComponentRef,
    ComponentFactoryResolver,
    ViewContainerRef,
    Output,
    EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { JalaliLocale } from '../../shared/jalali.locale';
import { NgJalaliMonthComponent } from './ng-jalali-month.component';
import { NgJalaliDateTimeService } from '../../ng-jalali-date-time.service';
import { NgJalaliMonthValueInterface } from './ng-jalali-month.interface';
import { NgJalaliDateTimeConfigInterface, NgJalaliDateTimeCssInterface } from '../../ng-jalali-date-time.interface';

@Directive({ selector: '[jalali-month]' })
export class NgJalaliMonthDirective implements OnInit {
    @Input() form: FormGroup;
    @Input() name: string;
    @Input() appearance: string;
    @Input() config: NgJalaliDateTimeConfigInterface;
    @Input() css: NgJalaliDateTimeCssInterface;

    @Input() month: string;
    @Input() label: string;

    public jalaliLocale = new JalaliLocale();

    @Output() changed = new EventEmitter<NgJalaliMonthValueInterface>();

    private component: ComponentRef<NgJalaliMonthComponent>;

    constructor(
        private readonly resolver: ComponentFactoryResolver,
        private readonly container: ViewContainerRef,
        private readonly service: NgJalaliDateTimeService
    ) {}

    ngOnInit() {
        if (!this.form) this.form = new FormGroup({});
        if (!this.name) this.name = 'jalali-month-' + Date.now().toString();
        this.appearance = this.service.checkAppearance(this.appearance);

        if (!this.config) this.config = {};
        this.config.required = this.config.required ? true : false;
        this.config.min = this.service.checkMonth(this.config.min) ? this.config.min : null;
        this.config.max = this.service.checkMonth(this.config.max) ? this.config.max : null;
        this.config.reset = this.config.reset === false ? false : true;
        this.config.error = this.config.error ? this.config.error : this.jalaliLocale.required;

        this.css = this.service.checkCSS(this.css);

        this.month = this.service.checkMonth(this.month);
        this.label = this.label ? this.label : this.jalaliLocale.month;

        const factory = this.resolver.resolveComponentFactory(NgJalaliMonthComponent);
        this.component = this.container.createComponent(factory);
        this.component.instance.form = this.form;
        this.component.instance.name = this.name;
        this.component.instance.appearance = this.appearance;
        this.component.instance.config = this.config;
        this.component.instance.css = this.css;

        this.component.instance.value = this.service.getMonthValue(this.month);
        this.component.instance.label = this.label;

        this.component.instance.changed = this.changed;
    }
}
