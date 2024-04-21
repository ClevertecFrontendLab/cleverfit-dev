type LocaleDayOfWekRu =
    | 'Понедельник'
    | 'Вторник'
    | 'Среда'
    | 'Четверг'
    | 'Пятница'
    | 'Суббота'
    | 'Воскресение';

export enum WeekDaysLocalKeys {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday',
}

export const weekDaysLocaleMap: Record<string, LocaleDayOfWekRu> = {
    [WeekDaysLocalKeys.Monday]: 'Понедельник',
    [WeekDaysLocalKeys.Tuesday]: 'Вторник',
    [WeekDaysLocalKeys.Wednesday]: 'Среда',
    [WeekDaysLocalKeys.Thursday]: 'Четверг',
    [WeekDaysLocalKeys.Friday]: 'Пятница',
    [WeekDaysLocalKeys.Saturday]: 'Суббота',
    [WeekDaysLocalKeys.Sunday]: 'Воскресение',
};

export const DAYS_IN_WEEK = 7;
export const DAYS_IN_MONTH = 28;
