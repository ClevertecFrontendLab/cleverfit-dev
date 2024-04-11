import { TabName, tabs } from '@pages/achievements-page/constants/tabs';
import { Tabs } from 'antd';

export const TabFilter = () => <Tabs defaultActiveKey={TabName.week} items={tabs} />;
