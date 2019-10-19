export interface NgJalaliDateTimeConfigInterface {
    required?: boolean;
    min?: string;
    max?: string;
    reset?: boolean;
    error?: string;

    time?: boolean; // DATETIME
    second?: boolean; // DATETIME
}

export interface NgJalaliDateTimeCssInterface {
    font?: string;

    field?: Object; // mat-form-field.ng-jalali
    input?: Object; // input.ng-jalali
    reset?: Object; // button.ng-jalali-reset
    box?: Object; // div.ng-jalali-calendar
    arrow?: Object; // div.ng-jalali-header div
    header?: Object; // div.ng-jalali-header div.ng-jalali-title
    item?: Object; // div.ng-jalali-date-time-day button && div.ng-jalali-month-season button && div.ng-jalali-range-day button
    selected?: Object; // button.ng-jalali-selected
    current?: Object; // button.ng-jalali-current

    // date-time
    date?: {
        name?: Object; // div.ng-jalali-date-time-header div
        time?: Object; // div.ng-jalali-date-time-time input
    };

    // month
    month?: {};

    // range
    range?: {
        tool?: Object; // div.ng-jalali-range-tools button
        custom?: Object; // div.ng-jalali-range-tools button.ng-jalali-range-custom (deactive)
        confirm?: Object; // div.ng-jalali-range-tools button.ng-jalali-range-custom (active)
        name?: Object; // div.ng-jalali-range-header div
        date?: Object; // div.ng-jalali-range-custom-title
    };
}
