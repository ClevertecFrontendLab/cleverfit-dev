import React, { ChangeEvent, FC } from 'react';
import { Checkbox, Input, InputNumber } from 'antd';

import { Nullable } from '../../types/nullable.ts';

import styles from './exercises-form.module.css';

type ExercisesFormProps = {
    index: number;
    indexes: number[];
    weight: number;
    approaches: number;
    name: string;
    replays: number;
    isCheck: boolean;
    onChangeName: (value: string, index: number) => void;
    onChangeReplays: (value: Nullable<number>, index: number) => void;
    onChangeWeight: (value: Nullable<number>, index: number) => void;
    onChangeApproaches: (value: Nullable<number>, index: number) => void;
    onCheckedElement: (index: number) => void;
};

export const ExercisesForm: FC<ExercisesFormProps> = ({
    onChangeReplays,
    onChangeApproaches,
    onChangeWeight,
    onChangeName,
    onCheckedElement,
    weight,
    replays,
    name,
    approaches,
    index,
    indexes,
    isCheck,
}) => {
    const isChecked = indexes.includes(index);

    const onChangeNameHandle = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeName(event.currentTarget.value, index);
    };

    const onChangeApproachesHandle = (value: Nullable<number>) => {
        onChangeApproaches(value, index);
    };

    const onChangeReplaysHandle = (value: Nullable<number>) => {
        onChangeReplays(value, index);
    };

    const onChangeWeightHandle = (value: Nullable<number>) => {
        onChangeWeight(value, index);
    };

    return (
        <React.Fragment>
            <Input
                value={name}
                className={styles.input}
                onChange={onChangeNameHandle}
                placeholder='Упражнения'
                addonAfter={
                    isCheck && (
                        <Checkbox checked={isChecked} onChange={() => onCheckedElement(index)} />
                    )
                }
            />
            <div className={styles.wrapperBlock}>
                <div className={styles.label}>Подходы</div>
                <div className={styles.wrapperItem}>
                    <div className={styles.simpleLabel}>Вес, кг</div>
                    <div className={styles.simpleLabel}>Количество</div>
                </div>
            </div>
            <div className={styles.wrapperBlock}>
                <InputNumber
                    value={replays}
                    className={styles.inputNumber}
                    addonBefore='+'
                    min={1}
                    onChange={onChangeReplaysHandle}
                />
                <div className={styles.wrapperItem}>
                    <InputNumber
                        value={weight}
                        className={styles.simpleInput}
                        min={0}
                        onChange={onChangeWeightHandle}
                    />
                    <InputNumber
                        value={approaches}
                        className={styles.simpleInput}
                        min={0}
                        onChange={onChangeApproachesHandle}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};
