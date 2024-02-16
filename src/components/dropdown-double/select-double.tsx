import { FC } from 'react';
import { Select } from 'antd';

import styles from './select-double.module.css';

type DropdownDoubleProps = {
    isDouble: boolean;
    defaultsItems: string[];
    selectedItems: string[];
    defaultItem: string;
    onSelectItem: (name: string) => void;
};

export const SelectDouble: FC<DropdownDoubleProps> = ({
    defaultsItems,
    selectedItems,
    onSelectItem,
    defaultItem,
    isDouble = true,
}) => {
    const items = isDouble
        ? defaultsItems
              .filter((element) => !selectedItems.includes(element))
              .map((element) => ({ label: element, value: element }))
        : selectedItems.map((element) => ({ label: element, value: element }));

    const onChange = (value: string) => {
        onSelectItem(value);
    };

    return (
        <Select
            defaultValue={defaultItem || 'Выбор типа тренировки'}
            className={styles.dropdownDouble}
            onChange={onChange}
            options={items}
        />
    );
};
