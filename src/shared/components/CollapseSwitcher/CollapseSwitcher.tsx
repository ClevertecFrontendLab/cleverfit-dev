import { FC } from 'react';
import switcherExpandedIcon from '@shared/assets/icons/icon-switcher-expanded.svg';
import switcherCollapsedIcon from '@shared/assets/icons/icon-switcher-collapsed.svg';

import styles from './CollapseSwitcher.module.css';

interface CollapseSwitcherProps {
    topPosition?: string;
    rightPosition?: string;
    collapsed: boolean;
    toggleMenu: () => void;
}

export const CollapseSwitcher: FC<CollapseSwitcherProps> = ({
    topPosition,
    rightPosition,
    collapsed,
    toggleMenu,
}) => (
    <button
        className={styles.CollapseSwitcher}
        style={{ top: topPosition, right: rightPosition }}
        onClick={toggleMenu}
    >
        <img
            src={collapsed ? switcherCollapsedIcon : switcherExpandedIcon}
            alt='Выход'
            className={styles.switcherIcon}
        />
    </button>
);
