import React from 'react';
import moment from 'moment';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const convertDate = (timestamp: number) =>
  moment(new Date(timestamp * 1000)).format("MMM YY'");

type AreaChartDataTypes = {
  date: string;
  uv: number;
  pv?: number;
};

interface AreaChartProps {
  data: AreaChartDataTypes[];
}

const dataColors = ['#449975', '#E16D40']; //not completed - should be changed dynamically.

const AnalyticsAreaChart: React.FC<AreaChartProps> = ({ data }) => {
  const dataKeys = Object.keys(data[0]).slice(1);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          {dataKeys.map((key, i) => (
            <linearGradient
              key={i}
              id={'color' + i}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={dataColors[i]} stopOpacity={1} />
              <stop offset="95%" stopColor={dataColors[i]} stopOpacity={0.1} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid
          strokeDasharray="8 3"
          strokeOpacity={0.7}
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tickFormatter={convertDate}
          tick={{
            stroke: 'black',
            opacity: '70%',
            strokeWidth: 1,
            transform: 'translate(0, 10)',
          }}
          ticks={[
            '1451610000',
            '1483232400',
            '1483232400',
            '1483232400',
            '1483232400',
            '1483232400',
            '1483232400',
            '1483232400',
          ]}
          tickSize={0}
          axisLine={{ stroke: '#000', opacity: '10%' }}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis
          type="number"
          domain={[475, 625]}
          ticks={[...Array.from(Array(7), (_, id) => id * 25 + 475)]}
          scale="linear"
          tick={{
            stroke: 'black',
            opacity: '70%',
            strokeWidth: 1,
            transform: 'translate(-16, 0)',
          }}
          tickSize={0}
          axisLine={{ stroke: '#000', opacity: '10%' }}
        />
        <Tooltip />
        {dataKeys.map((key, i) => (
          <Area
            key={i}
            dataKey={key}
            stroke={dataColors[i]}
            strokeWidth={3}
            fill={`url(#color${i})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsAreaChart;
