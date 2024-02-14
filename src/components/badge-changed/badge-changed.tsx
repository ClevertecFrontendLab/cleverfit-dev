import { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Badge, Button, Typography } from 'antd';
import { Moment } from 'moment';

import styles from './badge-changed.module.css';

const defaultColor = ['pink', 'yellow', 'green', 'blue', 'purple', 'gold'];

function getColorStatus() {
    const randomIndex = Math.floor(Math.random() * defaultColor.length);

    return defaultColor[randomIndex];
}

type BadgeChangedProps = {
    isEdit: boolean;
    text: string;
    date: Moment;
    disabled?: boolean;
    isStatus?: boolean;
    onChange?: (value: Moment, text: string) => void;
};

export const BadgeChanged: FC<BadgeChangedProps> = ({
    isEdit = true,
    isStatus,
    onChange,
    text,
    date,
    disabled,
}) =>
    text ? (
        <div className={isEdit ? styles.wrapper : styles.wrapperNoEdit}>
            {isStatus ? (
                <Badge
                    className={`${styles.badge}`}
                    style={{ color: disabled ? '#BFBFBF' : '' }}
                    color={getColorStatus()}
                    size='small'
                    text={text}
                />
            ) : (
                <Typography.Text type='secondary' className={styles.badge}>
                    {text}
                </Typography.Text>
            )}

            {isEdit && (
                <Button
                    type='link'
                    onClick={() => onChange && onChange(date, text)}
                    className={styles.button}
                    disabled={disabled}
                >
                    <EditOutlined />
                </Button>
            )}
        </div>
    ) : null;
