import { Dispatch, FC, SetStateAction } from 'react';
import switcherExpandedIcon from '@shared/assets/icons/icon-switcher-expanded.svg';
import switcherCollapsedIcon from '@shared/assets/icons/icon-switcher-collapsed.svg';

import styles from './CollapseSwitcher.module.css';

interface CollapseSwitcherProps {
    topPosition?: string;
    rightPosition?: string;
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export const CollapseSwitcher: FC<CollapseSwitcherProps> = ({
    topPosition,
    rightPosition,
    collapsed,
    setCollapsed,
}) => (
    <button
        className={styles.CollapseSwitcher}
        style={{ top: topPosition, right: rightPosition }}
        onClick={() => setCollapsed(!collapsed)}
    >
        <img
            src={collapsed ? switcherCollapsedIcon : switcherExpandedIcon}
            alt='Выход'
            className={styles.switcherIcon}
        />
    </button>
);
