# ng-jalali-date-time

Jalali date / month / range picker for Angular with Material Design support

---

## Table of contents

-   [Installation](#installation)
-   [Usage](#Usage)
-   [jalali-date-time Directive](#jalali-date-time-directive)
-   [jalali-month Directive](#jalali-month-directive)
-   [jalali-range Directive](#jalali-range-directive)
-   [Interfaces](#interfaces)
-   [Pipes](#pipes)

## Installation

```bash
# Create new Angular Application
ng new my-application

# Go to application directory
cd my-application

# Add Material support to your application
# Choose YES when you asked for setting up "browser animations for Angular Material"
ng add @angular/material

# Install ng-jalali-date-time and it dependencies, using NPM
npm install --save jalali-date-time ng-jalali-date-time
```

## Usage

import NgJalaliDateTimeModule

```js
import { NgJalaliDateTimeModule } from 'ng-jalali-date-time';

@NgModule({
    ...
    imports: [
        ...
        NgJalaliDateTimeModule
    ],
    ...
})
```

---

## jalali-date-time Directive

![alt text](../../src/assets/date-time-picker.png 'jalali-date-time')

```html
<span jalali-date-time></span>
```

### Properties

| Name   | Type                                                                | Description                           |
| ------ | ------------------------------------------------------------------- | ------------------------------------- |
| form   | FormGroup                                                           | Components FormGroup (Reactive Forms) |
| name   | string                                                              | Form object name (Reactive Forms)     |
| config | [NgJalaliDateTimeConfigInterface](#NgJalaliDateTimeConfigInterface) | Object configurations                 |
| css    | [NgJalaliDateTimeCssInterface](#NgJalaliDateTimeCssInterface)       | Object css styles                     |
| date   | string                                                              | Default date value                    |
| time   | string                                                              | Default time value                    |
| label  | string                                                              | mat-form-field label                  |

### Events

| Name    | type                                                              |
| ------- | ----------------------------------------------------------------- |
| changed | [NgJalaliDateTimeValueInterface](#NgJalaliDateTimeValueInterface) |

### Sample

```ts
# component.ts

import {
    NgJalaliDateTimeConfigInterface,
    NgJalaliDateTimeCssInterface,
    NgJalaliDateTimeValueInterface
} from 'ng-jalali-date-time';

export class MyComponent implements OnInit {
    public form: FormGroup
    public name: string = 'date';

    public config: NgJalaliDateTimeConfigInterface = {
        required: true,
        min: '1300-01-01',
        max: '1400-01-01',
        reset: true,
        error: 'مشخص کردن مقدار الزامی است',
        time: true,
        second: false
    };

    public css: NgJalaliDateTimeCssInterface = {
        font: 'yekan'
    };

    public date: string = '';
    public time: string = '';
    public label: string = 'انتخاب تاریخ';

    ngOnInit() {
        this.form = new FormGroup({})
    }

    dateChanged(value: NgJalaliDateTimeValueInterface) {
        console.log(value);
    }
}
```

```html
# component.html
<span
    jalali-date-time
    [form]="form"
    [name]="name"
    [config]="config"
    [css]="css"
    [date]="date"
    [time]="time"
    [label]="label"
    (changed)="dateChanged($event)"
>
</span>
```

### jalali-month Directive

![alt text](../../src/assets/month-picker.png 'jalali-month')

```html
<span jalali-month></span>
```

### Properties

| Name   | Type                                                                | Description                           |
| ------ | ------------------------------------------------------------------- | ------------------------------------- |
| form   | FormGroup                                                           | Components FormGroup (Reactive Forms) |
| name   | string                                                              | Form object name (Reactive Forms)     |
| config | [NgJalaliDateTimeConfigInterface](#NgJalaliDateTimeConfigInterface) | Object configurations                 |
| css    | [NgJalaliDateTimeCssInterface](#NgJalaliDateTimeCssInterface)       | Object css styles                     |
| month  | string                                                              | Default month value                   |
| label  | string                                                              | mat-form-field label                  |

### Events

| Name    | type                                                        |
| ------- | ----------------------------------------------------------- |
| changed | [NgJalaliMonthValueInterface](#NgJalaliMonthValueInterface) |

### Sample

```ts
# component.ts

import {
    NgJalaliDateTimeConfigInterface,
    NgJalaliDateTimeCssInterface,
    NgJalaliMonthValueInterface
} from 'ng-jalali-date-time';

export class MyComponent implements OnInit {
    public form: FormGroup
    public name: string = 'date';

    public config: NgJalaliDateTimeConfigInterface = {
        required: true,
        min: '1300-01',
        max: '1400-01',
        reset: true,
        error: 'مشخص کردن مقدار الزامی است'
    };

    public css: NgJalaliDateTimeCssInterface = {
        font: 'yekan'
    };

    public month: string = '';
    public label: string = 'انتخاب ماه';

    ngOnInit() {
        this.form = new FormGroup({})
    }

    dateChanged(value: NgJalaliDateTimeValueInterface) {
        console.log(value);
    }
}
```

```html
# component.html
<span
    jalali-month
    [form]="form"
    [name]="name"
    [config]="config"
    [css]="css"
    [month]="month"
    [label]="label"
    (changed)="dateChanged($event)"
>
</span>
```

### jalali-range Directive

![alt text](../../src/assets/range-picker.png 'jalali-range')

```html
<span jalali-range></span>
```

### Properties

| Name   | Type                                                                | Description                             |
| ------ | ------------------------------------------------------------------- | --------------------------------------- |
| form   | FormGroup                                                           | Components FormGroup (Reactive Forms)   |
| name   | string                                                              | Form object name (Reactive Forms)       |
| config | [NgJalaliDateTimeConfigInterface](#NgJalaliDateTimeConfigInterface) | Object configurations                   |
| css    | [NgJalaliDateTimeCssInterface](#NgJalaliDateTimeCssInterface)       | Object css styles                       |
| from   | string                                                              | Default range's first date (from) value |
| to     | string                                                              | Default range's last date (to) value    |
| label  | string                                                              | mat-form-field label                    |

### Events

| Name    | type                                                        |
| ------- | ----------------------------------------------------------- |
| changed | [NgJalaliRangeValueInterface](#NgJalaliRangeValueInterface) |

### Sample

```ts
# component.ts

import {
    NgJalaliDateTimeConfigInterface,
    NgJalaliDateTimeCssInterface,
    NgJalaliRangeValueInterface
} from 'ng-jalali-date-time';

export class MyComponent implements OnInit {
    public form: FormGroup
    public name: string = 'date';

    public config: NgJalaliDateTimeConfigInterface = {
        required: true,
        min: '1300-01-01',
        max: '1400-01-01',
        reset: true,
        error: 'مشخص کردن مقدار الزامی است'
    };

    public css: NgJalaliDateTimeCssInterface = {
        font: 'yekan'
    };

    public from: string = '';
    public to: string = '';
    public label: string = 'انتخاب دوره زمانی';

    ngOnInit() {
        this.form = new FormGroup({})
    }

    dateChanged(value: NgJalaliRangeValueInterface) {
        console.log(value);
    }
}
```

```html
# component.html
<span
    jalali-date-time
    [form]="form"
    [name]="name"
    [config]="config"
    [css]="css"
    [from]="from"
    [to]="to"
    [label]="label"
    (changed)="dateChanged($event)"
>
</span>
```

---

## Interfaces

### NgJalaliDateTimeConfigInterface

| Name     | Type    | Description                                    |
| -------- | ------- | ---------------------------------------------- |
| required | boolean | Set object as required on Reactive Forms       |
| min      | string  | Minimum acceptable date value                  |
| max      | string  | Maximum acceptable date value                  |
| reset    | boolean | Show reset button if date is selected          |
| error    | string  | Error message (Required object)                |
| time     | boolean | Show time selector                             |
| second   | boolean | Active second selector (if time value is true) |

### NgJalaliDateTimeCssInterface

| Name     | Type             | Description                                                                     |
| -------- | ---------------- | ------------------------------------------------------------------------------- |
| font     | string           | Font family name                                                                |
| field    | [NgStyle] object | mat-form-field CSS style                                                        |
| input    | [NgStyle] object | Input CSS style                                                                 |
| reset    | [NgStyle] object | Reset button CSS style                                                          |
| box      | [NgStyle] object | Calendar box CSS style                                                          |
| arrow    | [NgStyle] object | First/Previous/Next/Last arrows CSS style                                       |
| header   | [NgStyle] object | Calendar header (month/year title) CSS style                                    |
| item     | [NgStyle] object | Calendar date/month items CSS style                                             |
| selected | [NgStyle] object | Selected date/month item CSS style                                              |
| current  | [NgStyle] object | Current date/month item CSS style                                               |
| date     | object           | [jalali-date-time Directive CSS styles](#jalali-date-time-Directive-CSS-styles) |
| range    | object           | [jalali-range Directive CSS styles](#jalali-range-Directive-CSS-styles)         |

#### jalali-date-time Directive CSS styles

| Name | Type             | Description                       |
| ---- | ---------------- | --------------------------------- |
| name | [NgStyle] object | Day names CSS style               |
| time | [NgStyle] object | Time selectors (inputs) CSS style |

#### jalali-range Directive CSS styles

| Name    | Type             | Description                     |
| ------- | ---------------- | ------------------------------- |
| tool    | [NgStyle] object | Selector tools CSS style        |
| custom  | [NgStyle] object | Custom range selector CSS style |
| confirm | [NgStyle] object | Confirm selector CSS style      |
| name    | [NgStyle] object | Day names CSS style             |
| date    | [NgStyle] object | Custom date title CSS style     |

### NgJalaliDateTimeValueInterface

| Name      | Type   |
| --------- | ------ |
| jalali    | string |
| gregorian | string |
| date      | Date   |
| time      | string |
| timestamp | number |

#### Sample

```json
{
    "jalali": "1398-07-27",
    "gregorian": "2019-10-19",
    "date": "2019-10-19T09:04:00.000Z",
    "time": "12:34:00",
    "timestamp": 1571475840
}
```

### NgJalaliMonthValueInterface

| Name             | Type   |
| ---------------- | ------ |
| month            | string |
| days             | number |
| gregorian        | Object |
| gregorian .first | string |
| gregorian .last  | string |

#### Sample

```json
{
    "month": "1398-07",
    "days": 30,
    "gregorian": {
        "first": "2019-09-23",
        "last": "2019-10-22"
    }
}
```

### NgJalaliRangeValueInterface

| Name            | Type   |
| --------------- | ------ |
| range           | string |
| from            | string |
| to              | string |
| days            | number |
| hours           | number |
| minutes         | number |
| seconds         | number |
| gregorian       | Object |
| gregorian .from | string |
| gregorian .to   | string |

#### Sample

```json
{
    "range": "1398-07-01|1398-07-30",
    "from": "1398-07-01",
    "to": "1398-07-30",
    "days": 30,
    "hours": 720,
    "minutes": 43200,
    "seconds": 2592000,
    "gregorian": {
        "from": "2019-09-23",
        "to": "2019-10-22"
    }
}
```

---

## Pipes

| Pipe                        | Sample                                   | Result                                                 |
| --------------------------- | ---------------------------------------- | ------------------------------------------------------ |
| jalaliDate (date)           | '1398-07-27' \| jalaliDate               | Sat Oct 19 2019 00:00:00 GMT+0330 (Iran Standard Time) |
| jalaliDate (date/time)      | '1398-07-27 16:52:23' \| jalaliDate      | Sat Oct 19 2019 16:52:23 GMT+0330 (Iran Standard Time) |
| jalaliMonth                 | '1398-07' \| jalaliMonth                 | مهر ۱۳۹۸                                               |
| jalaliRange                 | '1398-07-01\|1398-07-30' \| jalaliRange  | ۱ تا ۳۰ مهر ۱۳۹۸                                       |
| jalaliFull (string)         | '1398-07-27 16:52:23' \| jalaliFull      | شنبه، ۲۷ مهر ۱۳۹۸ ۱۶:۵۲:۲۳                             |
| jalaliFull (timestamp)      | 1571491343 \| jalaliFull                 | شنبه، ۲۷ مهر ۱۳۹۸ ۱۶:۵۲:۲۳                             |
| jalaliTitle (string)        | '1398-07-27' \| jalaliTitle              | شنبه، ۲۷ مهر ۱۳۹۸                                      |
| jalaliTitle (timestamp)     | 1571491343 \| jalaliTitle                | شنبه، ۲۷ مهر ۱۳۹۸                                      |
| jalaliTimestamp (date)      | '1398-07-27' \| jalaliTimestamp          | 1571430600                                             |
| jalaliTimestamp (date/time) | '1398-07-27 16:52:23' \| jalaliTimestamp | 1571491343                                             |
| jalaliDays (range)          | '1398-07-01\|1398-07-30' \| jalaliDays   | 30                                                     |
| jalaliDays (date)           | '1398-07-27' \| jalaliDays               | 1                                                      |
