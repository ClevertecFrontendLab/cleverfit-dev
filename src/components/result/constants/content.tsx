import { ReactNode } from 'react';
import ErrorIcon from '@public/error_icon.svg?react';
import SuccessIcon from '@public/suссess_icon.svg?react';
import WarningIcon from '@public/warning_icon.svg?react';

export enum KEY {
    ERROR_409 = 'error-user-exist',
    ERROR = 'error',
    SUCCESS = 'success',
    ERROR_LOGIN = 'error-login',
}

const errorIcon = <ErrorIcon />;
const successIcon = <SuccessIcon />;
const warningIcon = <WarningIcon />;

export type ContentItem = {
    icon: ReactNode;
    title: string;
    description: string;
    buttonTitle: string;
};

export type ContentType = Record<KEY, ContentItem>;

export const CONTENT: ContentType = {
    [KEY.SUCCESS]: {
        icon: successIcon,
        title: 'Регистрация успешна',
        description:
            'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
        buttonTitle: 'Войти',
    },
    [KEY.ERROR]: {
        icon: errorIcon,
        title: 'Данные не сохранились',
        description: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
        buttonTitle: 'Повторить',
    },
    [KEY.ERROR_409]: {
        icon: errorIcon,
        title: 'Данные не сохранились',
        description:
            'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        buttonTitle: 'Назад к регистрации',
    },
    [KEY.ERROR_LOGIN]: {
        icon: warningIcon,
        title: 'Вход не выполнен',
        description: 'Что-то пошло не так. Попробуйте еще раз.',
        buttonTitle: 'Повторить',
    },
};
