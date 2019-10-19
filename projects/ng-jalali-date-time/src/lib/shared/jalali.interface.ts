export interface JalaliDayInterface {
    date: string;
    month: string;
    day: number;
}

export interface JalaliWeekInterface {
    days: JalaliDayInterface[];
}

export interface JalaliCalendarInterface {
    month: string;
    title: string;
    weeks: JalaliWeekInterface[];
}
