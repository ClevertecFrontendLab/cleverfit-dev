export enum SidebarPath {
    MAIN = '/main',
}
export const Paths = {
    AUTH: '/',
    LOGIN: '/auth',
    RECOVERY: '/recovery',
    RESULT: '/result',
    REGISTRATION: '/auth/registration',
    CONFIRM_EMAIL: 'confirm-email',
    CHANGE_PASSWORD: 'change-password',
    ERROR_409: 'error-user-exist',
    ERROR: 'error',
    SUCCESS: 'success',
    ERROR_LOGIN: 'error-login',
    ERROR_CHANGE_PASSWORD: 'error-change-password',
    SUCCESS_CHANGE_PASSWORD: 'success-change-password',
    ...SidebarPath,
} as const;
