import { useState } from 'react';
import logoMobile from '@shared/assets/icons/logo-mobile.png';
import { CollapseSwitcher } from '@shared/components/collapse-switcher';
import { MENU_ITEM_EXIT, MENU_ITEMS } from '@widgets/side-bar/config/menu-items';
import { Button, Divider, Drawer } from 'antd';

import styles from './mobile-sidebar.module.css';

const bodyStyle: React.CSSProperties = {
    padding: '0',
    paddingLeft: '8px',
    paddingRight: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

const headerStyle = {
    border: 'none',
    padding: '0',
};

export const MobileSideBar = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen((val) => !val);
    };

    const outerClass = open
        ? `${styles.switcherPosition} ${styles.switcherPositionInDrawer}`
        : styles.switcherPosition;

    return (
        <aside className={styles.mobileSideBar}>
            <CollapseSwitcher
                dataTestId='sider-switch-mobile'
                collapsed={!open}
                toggleMenu={toggleDrawer}
                outerClass={outerClass}
                isDesktop={false}
            />
            <Drawer
                title={<img src={logoMobile} alt='CleverFit' />}
                placement='left'
                width={106}
                onClose={toggleDrawer}
                open={open}
                closable={false}
                headerStyle={headerStyle}
                bodyStyle={bodyStyle}
                maskStyle={{
                    background: 'transparent',
                }}
            >
                <div className={styles.buttonBlock}>
                    {MENU_ITEMS.map(({ id, title }) => (
                        <Button type='text' key={id} className={styles.menuButton}>
                            <span>{title}</span>
                        </Button>
                    ))}
                </div>

                <Divider className={styles.divider} />
                <div className={styles.exitBlock}>
                    <Button type='text' className={styles.exitButton}>
                        {MENU_ITEM_EXIT.title}
                    </Button>
                </div>
            </Drawer>
        </aside>
    );
};
