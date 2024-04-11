import { ColumnGraph } from '@components/column-graph';
import { useWindowWidth } from '@hooks/use-window-with';
import { Training } from '@pages/achievements-page/types';
import { WorkloadItemsByWeeks } from '@pages/achievements-page/workload-statistic-block/workload-by-day-list';
import { Card, Col, Row } from 'antd';

import styles from './workload-statistic-block.module.css';

type WorkloadStatisticBlockProps = {
    filteredTrainings: Training[];
    isMonthPeriod: boolean;
};

export const WorkloadStatisticBlock = ({
    filteredTrainings,
    isMonthPeriod,
}: WorkloadStatisticBlockProps) => {
    const windowWith = useWindowWidth();

    return (
        <Row gutter={[32, 24]} align='middle' wrap={true}>
            <Col>
                <h5 className={styles.graphTitle}>Средняя нагрузка по дням недели</h5>
            </Col>
            <Col lg={isMonthPeriod ? 24 : 12} md={24} xs={24} className={styles.graphBlock}>
                <Card bodyStyle={{ padding: 0, height: windowWith > 576 ? 374 : 256 }}>
                    <ColumnGraph data={filteredTrainings} />
                </Card>
            </Col>
            <Col lg={isMonthPeriod ? 24 : 6} md={24} xs={24}>
                <WorkloadItemsByWeeks
                    filteredTrainings={filteredTrainings}
                    isMonthPeriod={isMonthPeriod}
                />
            </Col>
        </Row>
    );
};
