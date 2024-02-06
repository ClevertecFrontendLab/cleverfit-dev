export type GetFeedbackRequestType = {
    fullName: string;
    imageSrc: string;
    message: string;
    rating: number;
    createdAt: Date;
};

export type CreateFeedbackRequestType = {
    message: string;
    rating: number;
};
