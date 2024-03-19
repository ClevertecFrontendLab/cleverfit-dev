import { FC } from 'react';
import { ChangeType } from '@constants/card-modal';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingsSelector } from '@redux/modules/training';
import { Select } from 'antd';

import { DATA_TEST_ID } from '../../constans/data-test-id';

import styles from './select-double.module.css';

type DropdownDoubleProps = {
    isDouble?: boolean;
    defaultsItems: string[];
    selectedItems?: string[];
    defaultItem: string;
    onSelectItem: (name: string) => void;
    size?: string;
    screen?: string;
};

export const SelectDouble: FC<DropdownDoubleProps> = ({
    defaultsItems,
    selectedItems,
    onSelectItem,
    defaultItem,
    isDouble = true,
    size,
    screen,
}) => {
    const { typeEdit } = useAppSelector(trainingsSelector);
    const items = isDouble
        ? defaultsItems
              .filter((element) => !selectedItems?.includes(element))
              .map((element) => ({ label: element, value: element }))
        : selectedItems?.map((element) => ({ label: element, value: element }));

    const onChange = (value: string) => {
        onSelectItem(value);
    };

    return (
        <Select
            data-test-id={DATA_TEST_ID.modalCreateExerciseSelect}
            defaultValue={defaultItem || 'Выбор типа тренировки'}
            className={styles.dropdownDouble}
            onChange={onChange}
            options={items}
            size={size}
            disabled={screen === 'training' && typeEdit !== ChangeType.ADD_NEW}
        />
    );
};
