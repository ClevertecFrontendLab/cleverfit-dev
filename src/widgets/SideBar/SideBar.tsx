import { Dispatch, FC, SetStateAction } from 'react';
import { Button, Divider, Layout } from 'antd';
import classNames from 'classnames';
import { CollapseSwitcher } from '@shared/components/CollapseSwitcher';
import logoFull from '@shared/assets/icons/logo-full.svg';
import logoCollapsed from '@shared/assets/icons/logo-collapsed.svg';
import { menuItemExit, menuItems } from './config/menuItems';
import styles from './SideBar.module.css';

const { Sider } = Layout;

interface SideBarProps {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export const SideBar: FC<SideBarProps> = ({ collapsed, setCollapsed }) => (
    <Sider
        className={styles.SideBar}
        collapsible
        trigger={null}
        collapsed={collapsed}
        collapsedWidth='64px'
        width='208px'
    >
        <div
            className={classNames(styles.upperBlock, {
                [styles.upperBlockCollapsed]: collapsed,
            })}
        >
            <div className={styles.imageContainer}>
                <img
                    alt='CleverFit'
                    src={collapsed ? logoCollapsed : logoFull}
                    className={styles.logo}
                />
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
            setCollapsed={setCollapsed}
        />
    </Sider>
);
