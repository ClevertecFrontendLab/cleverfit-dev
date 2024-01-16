import { CredentialsType } from '@common-types/credentials';

export type LoginResponseType = {
    accessToken: string;
};

export type LoginRequestType = Omit<CredentialsType, 'confirm' | 'remember'>;
