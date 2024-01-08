import { FC } from 'react';
import { Button, Divider, Layout } from 'antd';
import classNames from 'classnames';
import { CollapseSwitcher } from '@shared/components/CollapseSwitcher';
import logoFull from '@shared/assets/icons/logo-full.svg';
import closeIcon from '@shared/assets/icons/buttons/icon-close.svg';
import { MENU_ITEM_EXIT, MENU_ITEMS } from '@widgets/SideBar/config/menu-items';
import styles from './mobile-sidebar.module.css';

const { Sider } = Layout;

type MobileSideBarProps = {
    collapsed: boolean;
    toggleMenu: () => void;
};

export const MobileSideBar: FC<MobileSideBarProps> = ({ collapsed, toggleMenu }) => (
    <Sider
        className={styles.mobileSideBar}
        collapsible
        trigger={null}
        collapsed={collapsed}
        collapsedWidth='0'
        width='100%'
    >
        <div
            className={classNames(styles.upperBlock, {
                [styles.upperBlockCollapsed]: collapsed,
            })}
        >
            <Button type='primary' className={styles.closeMobileButton} onClick={toggleMenu}>
                <img src={closeIcon} alt='close' style={{ width: '24px', height: '24px' }} />
            </Button>

            <div className={styles.imageContainer}>
                <img alt='CleverFit' src={logoFull} className={styles.logo} />
            </div>
            {MENU_ITEMS.map(({ id, icon, title }) => (
                <Button type='text' key={id} className={styles.menuButton}>
                    <img alt='icon' src={icon} />
                    {!collapsed && <span>{title}</span>}
                </Button>
            ))}
        </div>
        <div>
            <Divider className={styles.divider} />
            <Button
                type='text'
                className={classNames(styles.menuButton, styles.exitButton, {
                    [styles.collapsedButton]: collapsed,
                })}
            >
                <img alt='icon' src={MENU_ITEM_EXIT.icon} />
                {!collapsed && <span>{MENU_ITEM_EXIT.title}</span>}
            </Button>
        </div>
        <CollapseSwitcher
            outerClass={styles.switcherPosition}
            collapsed={collapsed}
            toggleMenu={toggleMenu}
        />
    </Sider>
);
