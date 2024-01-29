import { useState } from 'react';
import { ErrorModal } from '@components/error-modal';
import { ModalNoReview } from '@components/modal-no-reviews';
import { ModalReview } from '@components/modal-review';
import { NoReviews } from '@components/no-reviews';
import { ReviewCard } from '@components/review-card';
import { useGetFeedbacksQuery } from '@redux/serviсes/feedback';
import { Button } from 'antd';
import classNames from 'classnames';

import styles from './reviews-page.module.css';

export const ReviewsPage = () => {
    const [openNewReview, setOpenNewReview] = useState(false);
    const [openNoReview, setOpenNoReview] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const isAllReview = true;

    const showModal = () => {
        setOpenNewReview(true);
    };

    const { data } = useGetFeedbacksQuery();

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
                        <Button type='link' onClick={() => setOpenErrorModal(true)}>
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
                        open={openErrorModal}
                        setOpen={setOpenErrorModal}
                        setOpenNewReview={setOpenNewReview}
                    />
                </div>
            )}
        </div>
    );
};
