import { Moment } from 'moment/moment';

import { CardModalBody } from '../../../../constans/card-modal.ts';

export type TrainingDataCall = {
    name?: string;
    date: Moment;
    openFlag: CardModalBody;
};
