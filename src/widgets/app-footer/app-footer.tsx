import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Layout } from 'antd';

import { FooterCard } from './footer-card/footer-card';

import styles from './app-footer.module.css';

const { Footer } = Layout;

export const AppFooter = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isMainPage = pathname === '/main';

    return (
        <Footer className={styles.appFooter}>
            {isMainPage && (
                <Button type='link' onClick={() => navigate('/reviews')}>
                    <span className={styles.linkButtonText}>Смотреть отзывы</span>
                </Button>
            )}
            {isMainPage && <FooterCard />}
        </Footer>
    );
};
