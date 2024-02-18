import { FC } from 'react';
import { Select } from 'antd';

import { DATA_TEST_ID } from '../../../cypress/mocks/data-test-id';

import styles from './select-double.module.css';

type DropdownDoubleProps = {
    defaultsItems: string[];
    selectedItems: string[];
    defaultItem: string;
    disabled: boolean;
    onSelectItem: (name: string) => void;
};

export const SelectDouble: FC<DropdownDoubleProps> = ({
    defaultsItems,
    selectedItems,
    onSelectItem,
    defaultItem,
    disabled,
}) => {
    console.log(defaultsItems, 'defaultsItems');
    const adwad = ['Ноги', 'Руки', 'Силовая', 'Спина', 'Грудь'];
    const items = adwad
        .filter((element) => !selectedItems.includes(element))
        .map((element) => ({ label: element, value: element }));

    const onChange = (value: string) => {
        onSelectItem(value);
    };

    return (
        <Select
            data-test-id={DATA_TEST_ID.modalCreateExerciseSelect}
            disabled={disabled}
            defaultValue={defaultItem || 'Выбор типа тренировки'}
            className={styles.dropdownDouble}
            onChange={onChange}
            options={items}
        />
    );
};
