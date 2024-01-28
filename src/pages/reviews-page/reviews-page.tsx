import { useState } from 'react';
import { ErrorModal } from '@components/error-modal';
import { ModalNoReview } from '@components/modal-no-reviews';
import { ModalReview } from '@components/modal-review';
import { NoReviews } from '@components/no-reviews';
import { ReviewCard } from '@components/review-card';
import { Button } from 'antd';

import styles from './reviews-page.module.css';

export const ReviewsPage = () => {
    const [openNewReview, setOpenNewReview] = useState(false);
    const [openNoReview, setOpenNoReview] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const isReviews = true;

    const showModal = () => {
        setOpenNewReview(true);
    };

    return (
        <div className={styles.reviewWrap}>
            {!isReviews && <NoReviews />}
            {isReviews && (
                <div className={styles.reviewWrap}>
                    <ReviewCard />
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
