import calendarIcon from '@shared/assets/icons/icon-calendar.svg';
import exitIcon from '@shared/assets/icons/icon-exit.svg';
import heartIcon from '@shared/assets/icons/icon-heart.svg';
import profileIcon from '@shared/assets/icons/icon-profile.svg';
import topIcon from '@shared/assets/icons/icon-top.svg';

type MenuItem = {
    id: number;
    title: string;
    icon: string;
};

export const MENU_ITEMS: MenuItem[] = [
    {
        id: 1,
        title: 'Календарь',
        icon: calendarIcon,
    },
    {
        id: 2,
        title: 'Тренировки',
        icon: heartIcon,
    },
    {
        id: 3,
        title: 'Достижения',
        icon: topIcon,
    },
    {
        id: 4,
        title: 'Профиль',
        icon: profileIcon,
    },
];

export const MENU_ITEM_EXIT: MenuItem = {
    id: 5,
    title: 'Выход',
    icon: exitIcon,
};
