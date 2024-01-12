export enum SidebarPath {
    MAIN = '/main',
}
export const Paths = {
    AUTH: '/',
    LOGIN: '/auth',
    RESULT: '/result',
    REGISTRATION: '/auth/registration',
    ERROR_409: 'error-user-exist',
    ERROR: 'error',
    SUCCESS: 'success',
    ERROR_LOGIN: 'error-login',
    ...SidebarPath,
} as const;
