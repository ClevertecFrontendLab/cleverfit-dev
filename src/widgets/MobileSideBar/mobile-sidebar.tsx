import { useState } from 'react';
import { Button, Divider, Drawer } from 'antd';
import { MENU_ITEMS, MENU_ITEM_EXIT } from '@widgets/SideBar/config/menu-items';
import logoMobile from '@shared/assets/icons/logo-mobile.png';
import { CollapseSwitcher } from '@shared/components/CollapseSwitcher';
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

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <aside className={styles.mobileSideBar}>
            <CollapseSwitcher
                collapsed={!open}
                toggleMenu={showDrawer}
                outerClass={styles.switcherPosition}
                isDesktop={false}
            />
            <Drawer
                title={<img src={logoMobile} alt='CleverFit' />}
                placement={'left'}
                width={106}
                onClose={onClose}
                open={open}
                closable={false}
                headerStyle={headerStyle}
                bodyStyle={bodyStyle}
            >
                <div className={styles.buttonBlock}>
                    {MENU_ITEMS.map(({ id, title }) => (
                        <Button type='text' key={id} className={styles.menuButton}>
                            <span>{title}</span>
                        </Button>
                    ))}
                </div>

                <CollapseSwitcher
                    collapsed={!open}
                    toggleMenu={onClose}
                    outerClass={styles.switcherPositionInDrawer}
                    isDesktop={false}
                />

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
