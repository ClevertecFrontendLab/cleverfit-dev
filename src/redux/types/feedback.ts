export type GetFeedbackRequestType = {
    fullName: string;
    imageSrc: string;
    message: string;
    rating: number;
    createdAt: Date;
};

export type GetFeedbacksRequestType = {
    data: GetFeedbackRequestType[];
};

export type CreateFeedbackRequestType = {
    message: string;
    rating: number;
};
