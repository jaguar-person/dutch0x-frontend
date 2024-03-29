import { AnalyticPieChartDataI } from '@/types';
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Label,
} from 'recharts';
import * as DutchC from './styles';

interface PropsI {
  data?: AnalyticPieChartDataI[];
  totalTransaction: number;
}

const COLORS = ['#E16D40', '#449975', '#6661A3'];

const renderActiveShape = (props: any) => {
  const { cx, cy, fill, payload } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
    </g>
  );
};

const PieLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex gap-4 flex-wrap">
      {payload.reverse().map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex gap-1">
          <div
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: entry.color,
              marginTop: '6px',
              padding: '4px',
            }}
          />
          <div className="text-sm">
            <p className="font-bold">{entry.value}</p>
            <p>{props.data[index].value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const AnalyticsPieChart = ({ data, totalTransaction }: PropsI) => {
  return (
    <DutchC.ChartWrapper>
      {!data && <DutchC.NoDataWrapper>No data available</DutchC.NoDataWrapper>}
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          activeShape={renderActiveShape}
          cx="50%"
          cy={150}
          innerRadius={100}
          outerRadius={120}
          startAngle={-80}
          endAngle={360}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="#000"
                fontWeight={700}
                fontSize="small"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {((value * 100) / totalTransaction).toFixed(1) + '%'}
              </text>
            );
          }}
        >
          <Label position="center">
            Total Transactions: {totalTransaction}
          </Label>
          {!!data &&
            data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
        </Pie>
        <Legend
          verticalAlign="top"
          iconType="circle"
          align="left"
          content={<PieLegend data={data} />}
        />
      </PieChart>
    </DutchC.ChartWrapper>
  );
};

export default AnalyticsPieChart;
