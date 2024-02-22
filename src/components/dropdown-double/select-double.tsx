import { FC } from 'react';
import { Select } from 'antd';

import styles from './select-double.module.css';

type DropdownDoubleProps = {
    defaultsItems: string[];
    selectedItems?: string[];
    defaultItem: string;
    disabled: boolean;
    onSelectItem: (name: string) => void;
    size?: string;
};

export const SelectDouble: FC<DropdownDoubleProps> = ({
    defaultsItems,
    selectedItems,
    onSelectItem,
    defaultItem,
    disabled,
    size
}) => {
    let items = [];

    if (selectedItems) {
        items = defaultsItems
            .filter((element) => !selectedItems.includes(element))
            .map((element) => ({ label: element, value: element }));
    } else {
        items = defaultsItems.map((element) => ({ label: element, value: element }));
    }

    const onChange = (value: string) => {
        onSelectItem(value);
    };

    return (
        <Select
            disabled={disabled}
            defaultValue={defaultItem || 'Выбор типа тренировки'}
            className={styles.dropdownDouble}
            onChange={onChange}
            options={items}
            size={size}
        />
    );
};
