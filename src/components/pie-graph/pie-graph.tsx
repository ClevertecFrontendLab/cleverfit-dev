import { Pie, PieConfig } from '@ant-design/plots';

type PieGraphProps = {
    data: Array<{ exercise: string; percent: number }>;
};

export const PieGraph = ({ data }: PieGraphProps) => {
    const config: PieConfig = {
        data,
        angleField: 'percent',
        colorField: 'exercise',
        radius: 0.95,
        innerRadius: 0.6,
        legend: false,
        width: 300,
        height: 220,
        label: {
            text: 'exercise',
            position: 'outside',
        },
    };

    return <Pie {...config} />;
};
