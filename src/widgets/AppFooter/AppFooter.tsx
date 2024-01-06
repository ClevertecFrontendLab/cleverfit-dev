import { Button, Layout } from 'antd';
import { FooterCard } from './FooterCard/FooterCard';
import styles from './AppFooter.module.css';

const { Footer } = Layout;

export const AppFooter = () => (
    <Footer className={styles.AppFooter}>
        <Button type='link'>
            <span className={styles.linkButtonText}>Смотреть отзывы</span>
        </Button>
        <FooterCard />
    </Footer>
);
