import { FC, ReactNode } from 'react';
import { Card, CardProps } from 'antd';
import classNames from 'classnames';
import styles from './DescriptionCard.module.css';

export enum DescriptionCardTextSize {
    MEDIUM = 'medium',
    LARGE = 'large',
}

export enum DescriptionCardTextColor {
    BLUE = 'blue',
    DARK = 'dark',
}

interface DescriptionCardProps extends CardProps {
    textSize?: DescriptionCardTextSize;
    textColor?: DescriptionCardTextColor;
    children?: ReactNode;
}

export const DescriptionCard: FC<DescriptionCardProps> = ({
    children,
    textSize = DescriptionCardTextSize.MEDIUM,
    textColor = DescriptionCardTextColor.DARK,
    ...otherProps
}) => (
    <Card
        className={classNames({
            [styles[textSize]]: true,
            [styles[textColor]]: true,
        })}
        {...otherProps}
    >
        {children}
    </Card>
);
