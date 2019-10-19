import {
    Directive,
    OnInit,
    Input,
    ComponentRef,
    ComponentFactoryResolver,
    ViewContainerRef,
    EventEmitter,
    Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { JalaliLocale } from '../../shared/jalali.locale';
import { NgJalaliRangeComponent } from './ng-jalali-range.component';
import { NgJalaliDateTimeService } from '../../ng-jalali-date-time.service';
import { NgJalaliRangeValueInterface } from './ng-jalali-range.interface';
import { NgJalaliDateTimeConfigInterface, NgJalaliDateTimeCssInterface } from '../../ng-jalali-date-time.interface';

@Directive({ selector: '[jalali-range]' })
export class NgJalaliRangeDirective implements OnInit {
    @Input() form: FormGroup;
    @Input() name: string;
    @Input() config: NgJalaliDateTimeConfigInterface;
    @Input() css: NgJalaliDateTimeCssInterface;

    @Input() from: string;
    @Input() to: string;
    @Input() label: string;

    public jalaliLocale = new JalaliLocale();

    @Output() changed = new EventEmitter<NgJalaliRangeValueInterface>();

    private component: ComponentRef<NgJalaliRangeComponent>;

    constructor(
        private readonly resolver: ComponentFactoryResolver,
        private readonly container: ViewContainerRef,
        private readonly service: NgJalaliDateTimeService
    ) {}

    ngOnInit() {
        if (!this.form) this.form = new FormGroup({});
        if (!this.name) this.name = 'jalali-range-' + Date.now().toString();

        if (!this.config) this.config = {};
        this.config.required = this.config.required ? true : false;
        this.config.min = this.service.checkDate(this.config.min) ? this.config.min : null;
        this.config.max = this.service.checkDate(this.config.max) ? this.config.max : null;
        this.config.reset = this.config.reset === false ? false : true;
        this.config.error = this.config.error ? this.config.error : this.jalaliLocale.required;

        this.css = this.service.checkCSS(this.css);

        this.from = this.service.checkDate(this.from);
        this.to = this.service.checkDate(this.to);
        this.label = this.label ? this.label : this.jalaliLocale.range;

        const factory = this.resolver.resolveComponentFactory(NgJalaliRangeComponent);
        this.component = this.container.createComponent(factory);
        this.component.instance.form = this.form;
        this.component.instance.name = this.name;
        this.component.instance.config = this.config;
        this.component.instance.css = this.css;

        this.component.instance.value = this.service.getRangeValue(this.from, this.to);
        this.component.instance.label = this.label;

        this.component.instance.changed = this.changed;
    }
}
