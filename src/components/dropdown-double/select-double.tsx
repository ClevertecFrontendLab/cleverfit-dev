import { FC } from 'react';
import { Select } from 'antd';

import styles from './select-double.module.css';

type DropdownDoubleProps = {
    isDouble?: boolean;
    defaultsItems: string[];
    selectedItems?: string[];
    defaultItem: string;
    onSelectItem: (name: string) => void;
    size?: string;
    screen?: string;
    dataTestId?: string;
};

export const SelectDouble: FC<DropdownDoubleProps> = ({
    defaultsItems,
    selectedItems,
    onSelectItem,
    defaultItem,
    isDouble = true,
    screen,
    size,
    dataTestId,
}) => {
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
            data-test-id={dataTestId}
            defaultValue={defaultItem || 'Выбор типа тренировки'}
            className={styles.dropdownDouble}
            onChange={onChange}
            options={items}
            size={size}
            disabled={!!screen}
        />
    );
};
