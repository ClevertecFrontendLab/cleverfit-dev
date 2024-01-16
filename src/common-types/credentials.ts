export enum AuthFieldNames {
    password = 'password',
    email = 'email',
    confirmPassword = 'confirmPassword',
    remember = 'remember',
}

export type CredentialsType = {
    password: string;
    email: string;
    confirmPassword: string;
    remember: boolean;
};
