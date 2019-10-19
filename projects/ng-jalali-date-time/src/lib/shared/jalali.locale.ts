export class JalaliLocale {
    required: string = 'مشخص کردن مقدار الزامی است';
    notSpecified: string = 'مشخص نشده است';

    date: string = 'تاریخ';
    month: string = 'ماه';
    range: string = 'دوره زمانی';

    rangeTo: string = 'تا';
    rangeCustom: string = 'سفارشی';
    rangeCustomConfirm: string = 'انتخاب';
    rangeCurrentWeek: string = 'هفته جاری';
    rangeCurrentMonth: string = 'ماه جاری';
    rangeLast7Days: string = '۷ روز گذشته';
    rangeLast30Days: string = '۳۰ روز گذشته';
    rangeNext7Days: string = '۷ روز آینده';
    rangeNext30Days: string = '۳۰ روز آینده';

    monthNames: string[] = [
        'فروردین',
        'اردیبهشت',
        'خرداد',
        'تیر',
        'مرداد',
        'شهریور',
        'مهر',
        'آبان',
        'آذر',
        'دی',
        'بهمن',
        'اسفند'
    ];

    dayNames: string[] = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
}
