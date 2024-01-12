export enum AuthFieldNames {
    password = 'password',
    email = 'email',
    confirm = 'confirm',
    remember = 'remember',
}

export type CredentialsType = {
    password: string;
    email: string;
    confirm: string;
    remember: boolean;
};
