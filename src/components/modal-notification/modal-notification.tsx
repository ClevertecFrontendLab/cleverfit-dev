import { FC, memo, useEffect, useState } from 'react';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Modal, notification, Typography } from 'antd';

import styles from './modal-notification.module.css';

type ModalNotificationProps = {
    textButton: string;
    title: string;
    isCloseIcon: boolean;
    type: 'warning' | 'error';
    open: boolean;
    onClose?: () => void;
    onClickButton: () => void;
    subtitle?: string;
};

export const ModalNotification: FC<ModalNotificationProps> = memo(
    ({ open, onClickButton, onClose, title, isCloseIcon, type, subtitle, textButton }) => {
        const [openModal, setOpenModal] = useState(true);

        const openNotification = () => {
            const key = 'open';
            const btn = (
                <Button type='primary' size='middle' onClick={onClickButton}>
                    {textButton}
                </Button>
            );

            notification.open({
                message: <Typography.Title level={5}>{title}</Typography.Title>,
                description: <Typography.Text type='secondary'>{subtitle}</Typography.Text>,
                btn,
                key,
                icon: (
                    <CloseCircleOutlined
                        className={type === 'warning' ? styles.iconWarning : styles.iconError}
                    />
                ),
                duration: 0,
                closeIcon: isCloseIcon ? <CloseOutlined /> : '',
                onClose,
                className: styles.notification,
                placement: 'top',
            });
        };

        useEffect(() => {
            if (open && !openModal) {
                openNotification();

                return;
            }
            notification.close('open');
            setOpenModal(false);
        }, [open, openModal]);

        return (
            <Modal
                style={{ padding: 0 }}
                className={styles.modal}
                open={open}
                maskClosable={false}
                centered={true}
                onCancel={onClose}
                footer={null}
                closable={false}
                maskStyle={{ backdropFilter: 'blur(6px)' }}
            >
                <div />
            </Modal>
        );
    },
);
