import { Dispatch, SetStateAction, useState } from 'react';
import { FeedbackFieldNames } from '@common-types/credentials';
import { useCreateFeedback } from '@pages/login-page/hooks/use-create-feedback';
import { Button, Form, Input, Modal, Rate } from 'antd';

import styles from './modal-review.module.scss';

type ModalReviewProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

const { TextArea } = Input;

export const ModalReview = ({ open, setOpen, loading, setLoading }: ModalReviewProps) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    const { formNewReview, onFinish } = useCreateFeedback();

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

    const handleChangeMessage = (value: string) => {
        setMessage(value);
    };

    console.log(rating);

    console.log(message);

    const handleChangeRating = (value: number) => {
        setRating(value);
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
            footer={[null]}
            //     <Button key='submit' type='primary' loading={loading} onClick={handleOk}>
            //         Опубликовать
            //     </Button>,
            // ]}
        >
            <Form
                form={formNewReview}
                onFinish={onFinish}
                requiredMark={false}
                scrollToFirstError={true}
                style={{ width: '100%' }}
            >
                <Form.Item name={FeedbackFieldNames.rating}>
                    <Input
                        type='number'
                        onChange={(e) => handleChangeRating(Number(e.target.value))}
                        value={rating}
                    />
                </Form.Item>
                <Rate
                    style={{ color: '#faad14' }}
                    defaultValue={0}
                    onChange={(value) => handleChangeRating(value)}
                    className={styles.rate}
                />
                <Form.Item name={FeedbackFieldNames.message}>
                    <TextArea
                        rows={2}
                        placeholder='Введите текст отзыва'
                        // name={FeedbackFieldNames.message}
                        value={message}
                        onChange={(e) => handleChangeMessage(e.target.value)}
                    />
                    {/* <Button key='submit' type='primary' loading={loading} onClick={handleOk}>
                        Опубликовать
                    </Button> */}
                    <Button
                        type='primary'
                        htmlType='submit'
                        // block={true}
                        // className={styles.submitButton}
                        // data-test-id='login-submit-button'
                    >
                        Опубликовать
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
