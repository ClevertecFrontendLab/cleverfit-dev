import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';
import switcherExpandedIcon from '@shared/assets/icons/icon-switcher-expanded.svg';
import switcherCollapsedIcon from '@shared/assets/icons/icon-switcher-collapsed.svg';
import styles from './collapse-switcher.module.css';

type CollapseSwitcherProps = {
    collapsed: boolean;
    toggleMenu: () => void;
    outerClass?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CollapseSwitcher: FC<CollapseSwitcherProps> = ({
    outerClass,
    collapsed,
    toggleMenu,
    ...otherProps
}) => (
    <button
        data-test-id='sidebar-switcher'
        className={classNames(styles.collapseSwitcher, outerClass)}
        onClick={toggleMenu}
        {...otherProps}
    >
        <img
            src={collapsed ? switcherCollapsedIcon : switcherExpandedIcon}
            alt='Выход'
            className={styles.switcherIcon}
        />
    </button>
);
