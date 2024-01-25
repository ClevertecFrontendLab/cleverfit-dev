import { useNavigate } from 'react-router-dom';
import { Button, Layout } from 'antd';

import { FooterCard } from './footer-card/footer-card';

import styles from './app-footer.module.css';

const { Footer } = Layout;

export const AppFooter = () => {
    const navigate = useNavigate();

    return (
        <Footer className={styles.appFooter}>
            <Button type='link' onClick={() => navigate('/reviews')}>
                <span className={styles.linkButtonText}>Смотреть отзывы</span>
            </Button>
            <FooterCard />
        </Footer>
    );
};
