import { TabType } from '@components/profile-tabs/types/tabs';

export enum TabName {
    week = 'week',
    month = 'month',
    allPeriod = 'all-period',
}

export const tabs: Array<TabType<TabName>> = [
    {
        key: TabName.week,
        label: 'За неделю',
    },
    {
        key: TabName.month,
        label: 'За месяц',
    },
    {
        key: TabName.allPeriod,
        label: 'За всё время (PRO)',
        disabled: true,
    },
];
