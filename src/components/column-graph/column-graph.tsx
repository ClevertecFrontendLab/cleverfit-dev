import { Column, ColumnConfig } from '@ant-design/plots';
import { useWindowWidth } from '@hooks/use-window-with';
import { DAYS_IN_WEEK } from '@pages/achievements-page/constants/week-days';

type ColumnGraphProps = {
    data: Array<{ type: string; weight: number }>;
};

export const ColumnGraph = ({ data }: ColumnGraphProps) => {
    const windowWidth = useWindowWidth();
    // eslint-disable-next-line no-nested-ternary
    const scrollbarRatio = windowWidth < 868 ? 0.3 : windowWidth < 576 ? 0 : 0.5;
    const config: ColumnConfig = {
        data,
        xField: 'type',
        yField: 'weight',
        containerStyle: {
            height: '100%',
        },
        style: {
            maxWidth: 30,
        },
        scale: {
            x: {
                paddingOuter: -0.1,
            },
        },
        axis: {
            x: {
                title: 'Нагрузка, кг',
                style: {
                    labelTransform: 'rotate(0)',
                    titleFontSize: 14,
                },
            },
            y: {
                labelFormatter: (value: string | number) => `${value} кг`,
            },
        },
        scrollbar: data.length > DAYS_IN_WEEK && {
            x: {
                ratio: scrollbarRatio,
            },
        },
    };

    return <Column {...config} />;
};
