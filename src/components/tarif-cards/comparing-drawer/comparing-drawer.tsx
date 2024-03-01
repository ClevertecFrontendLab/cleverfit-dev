import React, { useState } from 'react';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useLogout } from '@hooks/use-logout';
import { profileCredentialSelector, profileTarifs } from '@redux/modules/profile';
import { useCreateTarifMutation } from '@redux/serviсes/profile';
import { Button, Drawer, Form, Modal, Radio, Typography } from 'antd';
import moment from 'moment';

import styles from './comparing-drawer.module.css';

const Traits = [
    {
        title: 'Статистика за месяц',
        free: true,
    },
    {
        title: 'Статистика за всё время',
        free: false,
    },
    {
        title: 'Совместные тренировки',
        free: true,
    },
    {
        title: 'Участие в марафонах',
        free: false,
    },
    {
        title: 'Приложение iOS',
        free: false,
    },
    {
        title: 'Приложение Android',
        free: false,
    },
    {
        title: 'Индивидуальный Chat GPT',
        free: false,
    },
];

type ComparingDrawerProps = {
    open: boolean;
    handleClose: () => void;
};

export const ComparingDrawer = ({ open, handleClose }: ComparingDrawerProps) => {
    const logout = useLogout();
    const tarifs = useAppSelector(profileTarifs);
    const credentials = useAppSelector(profileCredentialSelector);

    const [createTarif, { isSuccess }] = useCreateTarifMutation();
    const [isTouched, setIsTouched] = useState(false);

    const isProUser = credentials.tariff;
    const date = moment(credentials.tariff?.expired);
    const month = date.month() + 1;
    const monthString = month < 10 ? `0${month}` : month;
    const day = date.date();

    const onFieldsChange = () => {
        setIsTouched(true);
    };

    const onFinish = ({ days }: { days: number }) => {
        createTarif({
            // eslint-disable-next-line no-underscore-dangle
            tariffId: tarifs[0]._id,
            days,
        });
    };

    return (
        <React.Fragment>
            <Modal
                className={styles.modalEmail}
                open={isSuccess}
                closable={true}
                footer={false}
                onCancel={logout}
                centered={true}
            >
                <div className={styles.modalContentWrapper}>
                    <CheckCircleFilled className={styles.modalIcon} />
                    <div>
                        <Typography.Title level={3}>Чек для оплаты у вас на почте</Typography.Title>
                        Мы отправили инструкцию для оплаты вам на e-mail{' '}
                        <span>{credentials.email}</span>. После подтверждения оплаты войдите в
                        приложение заново.
                    </div>
                    <div>Не пришло письмо? Проверьте папку Спам.</div>
                </div>
            </Modal>
            <Drawer
                className={styles.compare}
                title='Сравнить тарифы'
                open={open}
                onClose={handleClose}
                mask={true}
                placement='right'
                closable={true}
                destroyOnClose={true}
                maskClosable={true}
                footer={
                    !isProUser && (
                        <Button form='form' type='primary' htmlType='submit' disabled={!isTouched}>
                            Выбрать и оплатить
                        </Button>
                    )
                }
                maskStyle={{ background: 'none' }}
            >
                {isProUser && (
                    <div className={styles.activePro}>
                        <Typography.Title level={5}>
                            Ваш PRO tarif активен до {monthString}.{day}
                        </Typography.Title>
                    </div>
                )}
                <div className={styles.btns}>
                    <div className={styles.tarifName}>FREE</div>
                    <div className={styles.tarifName}>
                        PRO {isProUser && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
                    </div>
                </div>
                <div className={styles.traits}>
                    {Traits.map(({ title, free }) => (
                        <div key={title} className={styles.trait}>
                            <div className={styles.traitTitle}>{title}</div>
                            {free ? (
                                <CheckCircleFilled />
                            ) : (
                                <CloseCircleOutlined style={{ color: '#bfbfbf' }} />
                            )}
                            <CheckCircleFilled className={styles.last} />
                        </div>
                    ))}
                </div>
                {!isProUser && tarifs && (
                    <Form
                        id='form'
                        className={styles.form}
                        onFieldsChange={onFieldsChange}
                        onFinish={onFinish}
                    >
                        <div className={styles.priceTitle}>Стоимость тарифа</div>
                        <Form.Item name='days'>
                            <Radio.Group className={styles.prices}>
                                {tarifs[0]?.periods.map(({ text, cost, days }) => (
                                    <Radio value={days} key={text}>
                                        <div className={styles.label}>
                                            {text}
                                            <Typography.Title level={5} className={styles.price}>
                                                {String(cost).replace('.', ',')} $
                                            </Typography.Title>
                                        </div>
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                )}
            </Drawer>
        </React.Fragment>
    );
};
