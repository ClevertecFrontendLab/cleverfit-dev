import { Paths } from '@routes/paths.ts';
import calendarIcon from '@shared/assets/icons/buttons/icon-calendar.svg';
import profileIcon from '@shared/assets/icons/buttons/icon-profile.svg';
import trainingIcon from '@shared/assets/icons/buttons/icon-training.svg';


export const CardMenu = [
    {route: Paths.TRAINING, name: 'Тренировки', icon: profileIcon, title: 'Тренировки', cardTitle: 'Расписать тренировки', id: 1},
    {route: Paths.CALENDAR, name: 'Календарь', icon: calendarIcon, title: 'Календарь', cardTitle: 'Назначить тренировки', id: 2},
    {route: Paths.PROFILE, name: 'Профиль', icon: trainingIcon, title: 'Профиль', cardTitle: 'Заполнить профиль', id: 4},
] as const;
