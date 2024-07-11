'use client';

import { H4 } from '@components/ui/typography';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { Order } from './types';

type ManagementActivityReportProps = {
  orders: Order[];
};

const ManagementActivityReport = ({
  orders,
}: ManagementActivityReportProps) => {
  const [selectedChart, setSelectedChart] = useState('paymentStatus');
  const [chartTitle, setChartTitle] = useState('訂單支付狀態');

  useEffect(() => {
    // 防止 select 改變時滾動條消失
    document.body.style.overflow = 'unset';
  }, [selectedChart]);

  const paymentStatusOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '支付狀態',
        type: 'pie',
        radius: '50%',
        data: Object.entries(
          orders.reduce(
            (acc, order) => {
              const { status } = order.payment;
              acc[status] = (acc[status] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>
          )
        ).map(([name, value]) => ({ name, value })),
      },
    ],
  };

  const orderStatusOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '訂單狀態',
        type: 'pie',
        radius: '50%',
        data: Object.entries(
          orders.reduce(
            (acc, order) => {
              acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
              return acc;
            },
            {} as Record<string, number>
          )
        ).map(([name, value]) => ({ name, value })),
      },
    ],
  };

  const orderTimeOption = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
      name: '訂單數',
    },
    series: [
      {
        name: '訂單數',
        type: 'line',
        data: orders
          .map((order) => ({
            time: new Date(order.createdAt).getTime(),
            count: 1,
          }))
          .sort((a, b) => a.time - b.time)
          .map((item) => [item.time, item.count]),
      },
    ],
  };

  const chartOptions = {
    paymentStatus: paymentStatusOption,
    orderStatus: orderStatusOption,
    orderTime: orderTimeOption,
  };

  const handleChartChange = (value: string) => {
    setSelectedChart(value);
    switch (value) {
      case 'paymentStatus':
        setChartTitle('訂單支付狀態');
        break;
      case 'orderStatus':
        setChartTitle('訂單狀態分布');
        break;
      case 'orderTime':
        setChartTitle('訂單時間趨勢');
        break;
      default:
        break;
    }
  };

  return (
    <section className="h-fit w-full p-4">
      <div className="mb-4 flex items-center gap-2">
        <Select onValueChange={handleChartChange} defaultValue="paymentStatus">
          <SelectTrigger className="w-[10rem] border-2 border-primary">
            <SelectValue placeholder="選擇圖表" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paymentStatus">支付狀態</SelectItem>
            <SelectItem value="orderStatus">訂單狀態</SelectItem>
            <SelectItem value="orderTime">訂單時間趨勢</SelectItem>
          </SelectContent>
        </Select>
        <H4>{chartTitle}</H4>
      </div>
      <ReactECharts
        option={chartOptions[selectedChart as keyof typeof chartOptions]}
        style={{ height: '400px' }}
      />
    </section>
  );
};

export default ManagementActivityReport;
