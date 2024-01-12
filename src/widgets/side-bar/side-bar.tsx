import { FC, useCallback } from 'react';
import { Button, Divider, Layout } from 'antd';
import classNames from 'classnames';
import { CollapseSwitcher } from '@shared/components/collapse-switcher';
import logoFull from '@shared/assets/icons/logo-full.svg';
import logoCollapsed from '@shared/assets/icons/logo-collapsed.svg';
import { MENU_ITEM_EXIT, MENU_ITEMS } from './config/menu-items';
import styles from './side-bar.module.css';
import { apiSlice } from '@redux/serviсes';
import { clearStateOnLogout } from '@redux/modules/app';
import { ACCESS_TOKEN_NAME } from '@constants/general';
import { useDispatch } from 'react-redux';

const { Sider } = Layout;

type SideBarProps = {
    collapsed: boolean;
    toggleMenu: () => void;
};

export const SideBar: FC<SideBarProps> = ({ collapsed, toggleMenu }) => {
    const dispatch = useDispatch();
    const logout = useCallback(() => {
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        dispatch(clearStateOnLogout());
        dispatch(apiSlice.util.resetApiState());
    }, [dispatch]);

    return (
        <Sider
            className={styles.sideBar}
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
                    onClick={logout}
                >
                    <img alt='icon' src={MENU_ITEM_EXIT.icon} />
                    {!collapsed && <span>{MENU_ITEM_EXIT.title}</span>}
                </Button>
            </div>
            <CollapseSwitcher
                dataTestId='sider-switch'
                outerClass={styles.switcherPosition}
                collapsed={collapsed}
                toggleMenu={toggleMenu}
                isDesktop={true}
            />
        </Sider>
    );
};