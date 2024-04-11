import { useEffect, useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { WorkloadByDayOfWeekType } from '@components/workload-by-day-of-week/type';
import { WorkloadItem } from '@components/workload-by-day-of-week/wrkload-item';
import { useWindowWidth } from '@hooks/use-window-with';
import { Space } from 'antd';
import classNames from 'classnames';

import styles from './workload-by-day-of-week.module.css';

type WorkloadByDatOfWeekProps = {
    title: string;
    items: WorkloadByDayOfWeekType[];
};

export const WorkloadByDayOfWeek = ({ title, items }: WorkloadByDatOfWeekProps) => {
    const [collapse, setCollapse] = useState(false);
    const windowWidth = useWindowWidth();
    const collapsable = windowWidth < 786;

    const onTitleClickHandler = () => {
        if (collapsable) {
            setCollapse(!collapse);
        }
    };

    const viewContent = (collapsable && !collapse) || !collapsable;

    useEffect(() => {
        if (!collapsable && collapse) {
            setCollapse(false);
        }
    }, [collapsable, collapse]);

    useEffect(() => {
        if (collapsable) {
            setCollapse(true);
        }
    }, [collapsable]);

    return (
        <Space size={20} direction='vertical'>
            <Space size={16} onClick={onTitleClickHandler}>
                <div
                    className={classNames({
                        [styles.title]: !collapsable,
                        [styles.titleCollapsable]: collapsable,
                    })}
                >
                    {title}
                </div>
                {collapsable && collapse && <DownOutlined className={styles.titleCollapsable} />}
                {collapsable && !collapse && <UpOutlined className={styles.titleCollapsable} />}
            </Space>

            {viewContent && (
                <Space size={4} direction='vertical'>
                    {items.map((item, index) => (
                        <WorkloadItem
                            key={String(Symbol(index))}
                            serialNumber={index + 1}
                            item={item}
                        />
                    ))}
                </Space>
            )}
        </Space>
    );
};
