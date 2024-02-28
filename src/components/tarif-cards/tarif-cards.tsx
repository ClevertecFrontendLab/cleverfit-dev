import { useEffect, useState } from 'react';
import { CheckCircleFilled, CheckOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import imgFree from '@public/tarifs/free.jpg';
import imgPro from '@public/tarifs/pro.jpg';
import { profileTarifs } from '@redux/modules/profile';
import { useLazyGetTarifsQuery } from '@redux/serviсes/profile';
import { Button, Card, Drawer, Form, Radio, Typography } from 'antd';
import classNames from 'classnames';

import styles from './tarif-cards.module.css';

const Tarifs = [
    { title: 'FREE tarif', img: imgFree },
    { title: 'PRO tarif', img: imgPro, forPro: true },
];

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

export const TarifCards = () => {
    const tarifs = useAppSelector(profileTarifs);
    const isProUser = false;

    const [openСomparison, setOpenСomparison] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [form] = Form.useForm();

    const [getTarifs, { isUninitialized }] = useLazyGetTarifsQuery();

    useEffect(() => {
        if (isUninitialized) {
            getTarifs();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpen = () => {
        setOpenСomparison(true);
    };

    const handleClose = () => {
        setOpenСomparison(false);
    };

    const onFieldsChange = () => {
        setIsTouched(true);
    };

    const onFinish = () => {};

    return (
        <div>
            <Typography.Title className={styles.title} level={4}>
                Мой тариф
            </Typography.Title>
            <div className={styles.cards}>
                {Tarifs.map(({ title, img, forPro }) => {
                    const hidePro = !isProUser && forPro;

                    return (
                        <Card
                            className={styles.card}
                            title={title}
                            extra={
                                <Button type='link' onClick={handleOpen}>
                                    Подробнее
                                </Button>
                            }
                            key={title}
                            hoverable={false}
                            cover={
                                <div
                                    className={classNames(styles.cover, {
                                        [styles.inactive]: hidePro,
                                    })}
                                >
                                    <img alt={title} src={img} />
                                    {hidePro && <div className={styles.inactiveBg} />}
                                </div>
                            }
                        >
                            {!hidePro && (
                                <div className={styles.active}>
                                    <Typography.Title level={5}>активен</Typography.Title>
                                    <CheckOutlined />
                                </div>
                            )}
                            {hidePro && (
                                <Button className={styles.btn} type='primary' onClick={handleOpen}>
                                    Активировать
                                </Button>
                            )}
                        </Card>
                    );
                })}
            </div>
            <Drawer
                className={styles.compare}
                title='Сравнить тарифы'
                open={openСomparison}
                onClose={handleClose}
                mask={true}
                placement='right'
                closable={true}
                destroyOnClose={true}
                maskClosable={true}
                headerStyle={{
                    border: 0,
                    padding: '24px 32px 16px 32px',
                    marginBottom: '24px',
                }}
                bodyStyle={{ padding: '0 32px' }}
                footer={
                    !isProUser && (
                        <Button
                            form='form'
                            type='primary'
                            htmlType='submit'
                            disabled={!isTouched}
                            onClick={() => form.submit()}
                        >
                            Выбрать и оплатить
                        </Button>
                    )
                }
                maskStyle={{ background: 'none' }}
            >
                <div className={styles.btns}>
                    <div className={styles.tarifName}>FREE</div>
                    <div className={styles.tarifName}>PRO</div>
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
                        form={form}
                        className={styles.form}
                        onFieldsChange={onFieldsChange}
                        onFinish={onFinish}
                    >
                        <div className={styles.priceTitle}>Стоимость тарифа</div>
                        <Form.Item name='tarif'>
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
        </div>
    );
};
