import { useState } from 'react';
import { ErrorModal } from '@components/error-modal';
import { ModalNoReview } from '@components/modal-no-reviews';
import { ModalReview } from '@components/modal-review';
import { NoReviews } from '@components/no-reviews';
import { ReviewCard } from '@components/review-card';
import { useGetFeedbacksQuery } from '@redux/serviсes/feedback';
import { GetFeedbackRequestType } from '@redux/types/feedback';
import { Button } from 'antd';
import classNames from 'classnames';

import { useCreateFeedback } from './hooks/use-create-feedback';

import styles from './reviews-page.module.css';

export const ReviewsPage = () => {
    const [openNewReview, setOpenNewReview] = useState(false);
    const [openNoReview, setOpenNoReview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAllReview, setIsAllReview] = useState(false);
    const { openErrorModal } = useCreateFeedback();
    const [openErrModal, setOpenErrorModal] = useState(openErrorModal);
    const { data } = useGetFeedbacksQuery();

    const isReviews = data && data.length === 0;

    const handleShowAllReviews = () => {
        setIsAllReview(!isAllReview);
    };

    const showModal = () => {
        setOpenNewReview(true);
    };

    return (
        <div className={styles.reviewWrap}>
            {isReviews && <NoReviews />}
            {!isReviews && (
                <div className={styles.reviewWrap}>
                    <div
                        className={classNames(styles.reviewBlock, {
                            [styles.reviewAllBlock]: isAllReview,
                        })}
                    >
                        {isAllReview
                            ? data &&
                              data.map(
                                  ({
                                      fullName,
                                      imageSrc,
                                      message,
                                      rating,
                                      createdAt,
                                  }: GetFeedbackRequestType) => (
                                      <ReviewCard
                                          key={message}
                                          fullName={fullName}
                                          imageSrc={imageSrc}
                                          message={message}
                                          rating={rating}
                                          createdAt={createdAt}
                                      />
                                  ),
                              )
                            : data &&
                              data
                                  .slice(0, 4)
                                  .map(
                                      ({
                                          fullName,
                                          imageSrc,
                                          message,
                                          rating,
                                          createdAt,
                                      }: GetFeedbackRequestType) => (
                                          <ReviewCard
                                              key={message}
                                              fullName={fullName}
                                              imageSrc={imageSrc}
                                              message={message}
                                              rating={rating}
                                              createdAt={createdAt}
                                          />
                                      ),
                                  )}
                    </div>
                    <div className={styles.buttonBlock}>
                        <Button type='primary' onClick={showModal} className={styles.buttonOpen}>
                            Написать отзыв
                        </Button>
                        <Button type='link' onClick={handleShowAllReviews}>
                            <span className={styles.linkButtonText}>
                                {isAllReview ? 'Свернуть отзывы' : 'Развернуть все отзывы'}
                            </span>
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
