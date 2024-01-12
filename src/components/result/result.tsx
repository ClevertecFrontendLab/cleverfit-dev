import styles from './result.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { CONTENT, KEY } from '@components/result/constants/content';
import { Button } from 'antd';
import { Paths } from '../../routes/paths';

export const Result = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const item = location.pathname.split('/').at(-1) as KEY;
    const onClickHandler = () => {
        if (item === KEY.SUCCESS) {
            navigate(Paths.AUTH);
        }
        if (item === KEY.ERROR_409) {
            navigate(Paths.REGISTRATION);
        }
        if (item === KEY.ERROR) {
            navigate(Paths.REGISTRATION, { state: { from: location } });
        }
        if (item === KEY.ERROR_LOGIN) {
            navigate(Paths.LOGIN);
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
