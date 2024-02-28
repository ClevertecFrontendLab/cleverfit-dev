import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalReview } from '@components/modal-review';
import { RequireAuth } from '@components/require-auth';
import { TarifCards } from '@components/tarif-cards';
import { TarifOptions } from '@components/tarif-options';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { profileIsLoadedSelector } from '@redux/modules/profile';
import { useLazyGetUserQuery } from '@redux/serviсes/profile';
import { Paths } from '@routes/paths';
import { Button } from 'antd';

import styles from './tarif-page.module.css';

export const TarifPage = () => {
    const isLoaded = useAppSelector(profileIsLoadedSelector);

    const [getUser, { isUninitialized }] = useLazyGetUserQuery();
    const [writeReview, setWriteReview] = useState(false);

    useEffect(() => {
        if (isUninitialized && !isLoaded) {
            getUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = () => {
        setWriteReview(true);
    };

    return (
        <RequireAuth>
            <div className={styles.back}>
                <TarifCards />
                {isLoaded && <TarifOptions />}
                <div className={styles.testimonials}>
                    <Button type='primary' onClick={handleClick}>
                        Написать отзыв
                    </Button>
                    <Link to={Paths.REVIEWS}>
                        <Button type='link'>Смотреть все отзывы</Button>
                    </Link>
                    <ModalReview open={writeReview} setOpen={setWriteReview} />
                </div>
            </div>
        </RequireAuth>
    );
};
