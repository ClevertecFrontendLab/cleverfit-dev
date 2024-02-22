import React from 'react';
import { SelectDouble } from '@components/dropdown-double';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setTrainingData, trainingsSelector } from '@redux/modules/training';
import { getKeyByPeriod, getPeriodByItem, getPeriodItems } from '@utils/find-period-options';
import { FORMAT_Y_M_D, formatDate } from '@utils/format-date';
import { Checkbox, Col, DatePicker, DatePickerProps, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import moment from 'moment';

export const Frequency: React.FC = () => {
    const {
        defaultTrainings,
        createdTraining: { name, date, parameters },
    } = useAppSelector(trainingsSelector);

    const dispatch = useAppDispatch();

    const frequencyHandler = (e: CheckboxChangeEvent) => {
        dispatch(
            setTrainingData({
                parameters: {
                    period: 0,
                    repeat: e.target.checked,
                    jointTraining: false,
                    participants: [],
                },
            }),
        );
    };

    const selectFrequencyHandler = (item: string) => {
        dispatch(
            setTrainingData({
                parameters: {
                    period: getPeriodByItem(item),
                    repeat: parameters?.repeat as boolean,
                    jointTraining: false,
                    participants: [],
                },
            }),
        );
    };

    const selectTrainigDateHandler = (dateString: DatePickerProps['onChange']) => {
        dispatch(setTrainingData({ date: formatDate(dateString, FORMAT_Y_M_D) }));
    };

    const selectTrainingTypeHandler = (value: string) => {
        dispatch(setTrainingData({ name: value }));
    };

    return (
        <div>
            <SelectDouble
                disabled={false}
                defaultItem={name}
                onSelectItem={selectTrainingTypeHandler}
                defaultsItems={defaultTrainings}
            />
            <Row gutter={16} style={{ marginTop: '24px' }}>
                <Col span={12}>
                    <DatePicker
                        size='small'
                        defaultValue={date ? moment(date) : ''}
                        onChange={selectTrainigDateHandler}
                    />
                </Col>
                <Col span={12}>
                    <Checkbox checked={parameters?.repeat} onChange={frequencyHandler}>
                        С периодичностью
                    </Checkbox>
                </Col>
                <Col span={12} style={{ marginTop: '8px' }}>
                    {parameters?.repeat && (
                        <SelectDouble
                            disabled={!parameters?.repeat}
                            defaultItem={getKeyByPeriod(parameters?.period) || 'Периодичность'}
                            onSelectItem={selectFrequencyHandler}
                            defaultsItems={getPeriodItems()}
                            size='small'
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
};
