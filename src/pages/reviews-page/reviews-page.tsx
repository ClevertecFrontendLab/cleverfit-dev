import { useState } from 'react';
import { ErrorModal } from '@components/error-modal';
import { ModalNoReview } from '@components/modal-no-reviews';
import { ModalReview } from '@components/modal-review';
import { NoReviews } from '@components/no-reviews';
import { ReviewCard } from '@components/review-card';
import { useCreateFeedback } from '@pages/login-page/hooks/use-create-feedback';
import { useGetFeedbacksQuery } from '@redux/serviсes/feedback';
import { Button } from 'antd';
import classNames from 'classnames';

import styles from './reviews-page.module.css';

export const ReviewsPage = () => {
    const [openNewReview, setOpenNewReview] = useState(false);
    const [openNoReview, setOpenNoReview] = useState(false);

    const [loading, setLoading] = useState(false);
    const isAllReview = true;

    const { openErrorModal } = useCreateFeedback();

    const showModal = () => {
        setOpenNewReview(true);
    };

    const { data } = useGetFeedbacksQuery();

    const [openErrModal, setOpenErrorModal] = useState(openErrorModal);

    console.log(data);
    const isReviews = true;

    return (
        <div className={styles.reviewWrap}>
            {!isReviews && <NoReviews />}
            {isReviews && (
                <div className={styles.reviewWrap}>
                    <div
                        className={classNames(styles.reviewBlock, {
                            [styles.reviewAllBlock]: isAllReview,
                        })}
                    >
                        <ReviewCard
                            fullName={data?.fullName}
                            imageSrc={data?.imageSrc}
                            message={data?.message}
                            rating={data?.rating}
                            createdAt={data?.createdAt}
                        />
                        ),
                    </div>
                    <div className={styles.buttonBlock}>
                        <Button type='primary' onClick={showModal} className={styles.buttonOpen}>
                            Написать отзыв
                        </Button>
                        <Button
                            type='link'
                            // onClick={() => setOpenErrorModal(true)}
                        >
                            <span className={styles.linkButtonText}>Развернуть все отзывы</span>
                        </Button>
                    </div>

                    <ModalReview
                        open={openNewReview}
                        setOpen={setOpenNewReview}
                        loading={loading}
                        setLoading={setLoading}
                    />

                    <ModalNoReview open={openNoReview} setOpen={setOpenNoReview} />

                    <ErrorModal
                        open={openErrModal}
                        setOpen={setOpenErrorModal}
                        setOpenNewReview={setOpenNewReview}
                    />
                </div>
            )}
        </div>
    );
};
