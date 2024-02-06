import { Dispatch, SetStateAction, useState } from 'react';
import { FeedbackFieldNames } from '@common-types/credentials';
import { ErrorModal } from '@components/error-modal';
import { SuccessModal } from '@components/success-modal';
import { useCreateFeedback } from '@pages/reviews-page/hooks/use-create-feedback';
import { Button, Form, Input, Modal, Rate } from 'antd';

import styles from './modal-review.module.scss';

type ModalReviewProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const { TextArea } = Input;

export const ModalReview = ({ open, setOpen }: ModalReviewProps) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const {
        formNewReview,
        onFinish,
        openErrorModal,
        setOpenErrorModal,
        openSuccessModal,
        setOpenSuccessModal,
    } = useCreateFeedback();

    const handleOk = () => {
        setMessage('');
        setRating(0);
        setOpen(false);
    };

    const handleCancel = () => {
        setMessage('');
        setRating(0);
        setOpen(false);
    };

    const handleChangeMessage = (value: string) => {
        setMessage(value);
    };

    const handleChangeRating = (value: number) => {
        setRating(value);
    };

    return (
        <div>
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
            >
                <Form
                    form={formNewReview}
                    onFinish={onFinish}
                    requiredMark={false}
                    scrollToFirstError={true}
                    style={{ width: '100%' }}
                >
                    <Form.Item name={FeedbackFieldNames.rating}>
                        <Rate
                            style={{ color: '#faad14' }}
                            value={rating}
                            onChange={(value) => handleChangeRating(value)}
                            className={styles.rate}
                        />
                    </Form.Item>
                    <Form.Item name={FeedbackFieldNames.message}>
                        <TextArea
                            autoSize={true}
                            rows={2}
                            placeholder='Введите текст отзыва'
                            value={message}
                            onChange={(e) => handleChangeMessage(e.target.value)}
                        />
                    </Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        block={true}
                        className={styles.submitButton}
                        data-test-id='new-review-submit-button'
                        onClick={handleOk}
                    >
                        Опубликовать
                    </Button>
                </Form>
            </Modal>

            <ErrorModal
                open={openErrorModal}
                setOpen={setOpenErrorModal}
                setOpenNewReview={setOpen}
            />
            <SuccessModal open={openSuccessModal} setOpen={setOpenSuccessModal} />
        </div>
    );
};
