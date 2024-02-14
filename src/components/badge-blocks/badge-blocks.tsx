import { FC } from 'react';
import { BadgeChanged } from '@components/badge-changed/badge-changed.tsx';
import { UserTraining } from '@redux/types/training.ts';
import { Moment } from 'moment';

type BadgeBlocksProps = {
    listData: UserTraining[];
    onStop?: (event: any, date: Moment | string) => void;
    onChangeCell?: (date: Moment | string) => void;
    date: Moment;
    onChangeBadge?: (data: Moment) => void;
};

export const BadgeBlocks: FC<BadgeBlocksProps> = ({
    listData = [],
    onStop,
    onChangeCell,
    date,
    onChangeBadge,
}) => {
    const onStopEvent = (event: any, value: Moment | string) => onStop && onStop(event, value);

    const onChangeCellHandle = (value: Moment | string) => onChangeCell && onChangeCell(value);

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus,jsx-a11y/no-static-element-interactions
        <div
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            onDoubleClick={() => onChangeCellHandle(date.format('YYYY-MM-DD'))}
            onClick={(event) => onStopEvent(event, date.format('YYYY-MM-DD'))}
        >
            <ul className='events'>
                {listData.map(({ name, isImplementation }, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={name + index} style={{ lineHeight: 1.2 }}>
                        <BadgeChanged
                            disabled={isImplementation}
                            onChange={onChangeBadge}
                            text={name}
                            date={date}
                            isEdit={false}
                            isStatus={true}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
