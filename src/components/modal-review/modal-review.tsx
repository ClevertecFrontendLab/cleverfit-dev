import { Dispatch, SetStateAction } from 'react';
import { Button, Form, Modal, Rate } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import styles from './modal-review.module.scss';

type ModalReviewProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

export const ModalReview = ({ open, setOpen, loading, setLoading }: ModalReviewProps) => {
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            title='Ваш отзыв'
            bodyStyle={{ padding: '64px 32px 56px 32px' }}
            onOk={handleOk}
            centered={true}
            onCancel={handleCancel}
            width={540}
            maskStyle={{ backdropFilter: 'blur(6px)' }}
            footer={[
                <Button key='submit' type='primary' loading={loading} onClick={handleOk}>
                    Опубликовать
                </Button>,
            ]}
        >
            <Form>
                <Rate style={{ color: '#faad14' }} defaultValue={0} className={styles.rate} />
                <TextArea placeholder='Введите текст отзыва' autoSize={{ minRows: 2 }} />
            </Form>
        </Modal>
    );
};
