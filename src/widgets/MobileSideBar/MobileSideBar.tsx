import { FC } from 'react';
import { Button, Divider, Layout } from 'antd';
import classNames from 'classnames';
import { CollapseSwitcher } from '@shared/components/CollapseSwitcher';
import logoFull from '@shared/assets/icons/logo-full.svg';
import closeIcon from '@shared/assets/icons/buttons/icon-close.svg';
import { menuItemExit, menuItems } from '@widgets/SideBar/config/menuItems';
import styles from './MobileSideBar.module.css';

const { Sider } = Layout;

interface MobileSideBarProps {
    collapsed: boolean;
    toggleMenu: () => void;
}

export const MobileSideBar: FC<MobileSideBarProps> = ({ collapsed, toggleMenu }) => (
    <Sider
        className={styles.MobileSideBar}
        collapsible
        trigger={null}
        collapsed={collapsed}
        collapsedWidth='0px'
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
            {menuItems.map(({ id, icon, title }) => (
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
                <img alt='icon' src={menuItemExit.icon} />
                {!collapsed && <span>{menuItemExit.title}</span>}
            </Button>
        </div>
        <CollapseSwitcher
            topPosition='calc(50% - 33px)'
            rightPosition='-105px'
            collapsed={collapsed}
            toggleMenu={toggleMenu}
        />
    </Sider>
);
