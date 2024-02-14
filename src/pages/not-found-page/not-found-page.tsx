import { useNavigate } from 'react-router-dom';
import { Exception } from '@components/exception';
import { Paths } from '@routes/paths';
import { Button } from 'antd';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoToMainPage = () => {
        navigate(Paths.MAIN);
    };

    return (
        <Exception
            status='404'
            title='404'
            subTitle='Страница не найдена'
            extra={
                <Button type='link' onClick={handleGoToMainPage}>
                    Перейти на главную страницу
                </Button>
            }
        />
    );
};
