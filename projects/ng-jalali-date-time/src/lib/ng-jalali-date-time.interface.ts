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

    field?: { [key: string]: any }; // mat-form-field.ng-jalali
    input?: { [key: string]: any }; // input.ng-jalali
    reset?: { [key: string]: any }; // button.ng-jalali-reset
    box?: { [key: string]: any }; // div.ng-jalali-calendar
    arrow?: { [key: string]: any }; // div.ng-jalali-header div
    header?: { [key: string]: any }; // div.ng-jalali-header div.ng-jalali-title
    item?: { [key: string]: any }; // div.ng-jalali-date-time-day button && div.ng-jalali-month-season button && div.ng-jalali-range-day button
    selected?: { [key: string]: any }; // button.ng-jalali-selected
    current?: { [key: string]: any }; // button.ng-jalali-current

    // date-time
    date?: {
        name?: { [key: string]: any }; // div.ng-jalali-date-time-header div
        time?: { [key: string]: any }; // div.ng-jalali-date-time-time input
    };

    // month
    month?: {};

    // range
    range?: {
        tool?: { [key: string]: any }; // div.ng-jalali-range-tools button
        custom?: { [key: string]: any }; // div.ng-jalali-range-tools button.ng-jalali-range-custom (deactive)
        confirm?: { [key: string]: any }; // div.ng-jalali-range-tools button.ng-jalali-range-custom (active)
        name?: { [key: string]: any }; // div.ng-jalali-range-header div
        date?: { [key: string]: any }; // div.ng-jalali-range-custom-title
    };
}
