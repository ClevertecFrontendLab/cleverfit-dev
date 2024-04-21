import { ExerciseItem } from '@components/exercises-by-days/exercise-item/exercise-item';
import { weekDaysLocaleMap } from '@pages/achievements-page/constants/week-days';
import { Space } from 'antd';

export const ExercisesByDays = ({ items }: { items: Record<string, string> }) => (
    <Space size={20} direction='vertical'>
        <div style={{ width: 194 }}>Самые частые упражнени по дням недели</div>

        <Space size={4} direction='vertical'>
            <ExerciseItem
                serialNumber={1}
                day={weekDaysLocaleMap.Monday}
                exercise={items[weekDaysLocaleMap.Monday]}
            />
            <ExerciseItem
                serialNumber={2}
                day={weekDaysLocaleMap.Tuesday}
                exercise={items[weekDaysLocaleMap.Tuesday]}
            />
            <ExerciseItem
                serialNumber={3}
                day={weekDaysLocaleMap.Wednesday}
                exercise={items[weekDaysLocaleMap.Wednesday]}
            />
            <ExerciseItem
                serialNumber={4}
                day={weekDaysLocaleMap.Thursday}
                exercise={items[weekDaysLocaleMap.Thursday]}
            />
            <ExerciseItem
                serialNumber={5}
                day={weekDaysLocaleMap.Friday}
                exercise={items[weekDaysLocaleMap.Friday]}
            />
            <ExerciseItem
                serialNumber={6}
                day={weekDaysLocaleMap.Saturday}
                exercise={items[weekDaysLocaleMap.Saturday]}
            />
            <ExerciseItem
                serialNumber={7}
                day={weekDaysLocaleMap.Sunday}
                exercise={items[weekDaysLocaleMap.Sunday]}
            />
        </Space>
    </Space>
);
