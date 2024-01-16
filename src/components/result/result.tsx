import { useNavigate } from 'react-router-dom';
import { CONTENT, KEY } from '@components/result/constants/content';
import { useLastPartUrl } from '@hooks/use-last-part-url';
import { Paths } from '@routes/paths';
import { Button } from 'antd';

import styles from './result.module.css';

const redirectionMap = {
    [KEY.SUCCESS]: Paths.AUTH,
    [KEY.ERROR_409]: Paths.REGISTRATION,
    [KEY.ERROR]: Paths.REGISTRATION,
    [KEY.ERROR_LOGIN]: Paths.LOGIN,
    [KEY.SUCCESS_CHANGE_PASSWORD]: Paths.AUTH,
    [KEY.ERROR_CHANGE_PASSWORD]: `${Paths.LOGIN}/${Paths.CHANGE_PASSWORD}`,
};

export const Result = () => {
    const navigate = useNavigate();
    const { location, lastPartUrl } = useLastPartUrl();
    const item = lastPartUrl as KEY;
    const onClickHandler = () => {
        const redirectTo = redirectionMap[item];

        if (redirectTo) {
            navigate(redirectTo, { state: { from: location } });
        }
    };

    return (
        <div className={styles.resultContainer}>
            {CONTENT[item].icon}
            <div className={styles.descriptionContainer}>
                <span className={styles.title}>{CONTENT[item].title}</span>
                <span className={styles.description}>{CONTENT[item].description}</span>
            </div>
            <Button onClick={onClickHandler} type='primary' block={true}>
                {CONTENT[item].buttonTitle}
            </Button>
        </div>
    );
};
