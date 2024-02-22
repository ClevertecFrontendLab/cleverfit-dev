import React, { useEffect, useState } from 'react';
import inProgress from '@public/in-progress.png';
import { useWindowSize } from '@uidotdev/usehooks';
import { Image, Typography } from 'antd';

import styles from './group-workouts.module.css';

export const GroupWorkouts = () => {
    const size = useWindowSize();

    const [isDesktopVersion, setDesktopVersion] = useState(true);

    useEffect(() => {
        if (Number(size.width) && Number(size.width) < 850) {
            setDesktopVersion(false);
        } else {
            setDesktopVersion(true);
        }
    }, [size.width]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Image preview={false} src={inProgress} />
                <Typography.Title level={3} style={{ marginTop: '24px', width: '255px' }}>
                    Данный раздел ещё в разработке
                </Typography.Title>
            </div>
        </div>
    );
};
