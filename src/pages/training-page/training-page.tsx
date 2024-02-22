import { useEffect, useState } from 'react';
import { ModalNoReview } from '@components/modal-no-reviews';
import { ModalNotification } from '@components/modal-notification';
import { GroupWorkouts } from '@components/training/group-workouts/group-workouts';
import { Marathons } from '@components/training/marathons';
import { MyWorkouts } from '@components/training/my-workouts/my-workouts.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { resetState, trainingsSelector } from '@redux/modules/training.ts';
import { useGetUserTrainingQuery, useLazyGetTrainingListQuery } from '@redux/serviсes/training.ts';
import { Tabs } from 'antd';
import classNames from 'classnames';

import styles from './training-page.module.css';

const tabsItems = [
    {
        label: 'Мои тренировки',
        key: 'my-workouts',
        children: <MyWorkouts />,
    },
    {
        label: 'Совместные тренировки',
        key: 'group-workouts',
        children: <GroupWorkouts />,
    },
    {
        label: 'Марафоны',
        key: 'marathons',
        children: <Marathons />,
    },
];

export const TrainingPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [currentTab, setCurrentTab] = useState('');

    const { defaultTrainings } = useAppSelector(trainingsSelector);
    const dispatch = useAppDispatch();

    const { isError, isSuccess } = useGetUserTrainingQuery();
    const [getList, { isError: isErrorRequest }] = useLazyGetTrainingListQuery();

    useEffect(() => {
        if (isSuccess && !defaultTrainings?.length) {
            getList();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isErrorRequest) {
            setOpenModal(true);
        }
    }, [isErrorRequest]);

    const retryRequestHandler = () => {
        setOpenModal(false);
        getList();
    };

    const onCloseModal = () => {
        dispatch(resetState());
        setOpenModal(false);
    };

    const currentTabHandler = (activeKey: string) => setCurrentTab(activeKey);

    return (
        <div
            className={classNames(styles.root, {
                [styles.marathonTab]: currentTab === 'marathons',
            })}
        >
            <Tabs centered={true} onChange={currentTabHandler} items={tabsItems} />

            <ModalNoReview open={isError || isErrorRequest} />

            <ModalNotification
                textButton='Обновить'
                onClickButton={retryRequestHandler}
                type='warning'
                isCloseIcon={true}
                title='При открытии данных произошла ошибка'
                subtitle='Попробуйте ещё раз.'
                open={openModal}
                onClose={onCloseModal}
            />
        </div>
    );
};
