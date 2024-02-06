export enum AuthFieldNames {
    password = 'password',
    email = 'email',
    confirmPassword = 'confirmPassword',
    remember = 'remember',
}

export enum FeedbackFieldNames {
    message = 'message',
    rating = 'rating',
}

export type CredentialsType = {
    password: string;
    email: string;
    confirmPassword: string;
    remember: boolean;
};

export type CredentialsFeedbackType = {
    message: string;
    rating: number;
};
