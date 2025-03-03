import { Column } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';

function Chart(){
  const data = [
    {
      "name": "Employees",
      "月份": "Jan.",
      "月均降雨量": 18.9
    },
    {
      "name": "Employees",
      "月份": "Feb.",
      "月均降雨量": 28.8
    },
    {
      "name": "Employees",
      "月份": "Mar.",
      "月均降雨量": 39.3
    },
    {
      "name": "Employees",
      "月份": "Apr.",
      "月均降雨量": 81.4
    },
    {
      "name": "Employees",
      "月份": "May",
      "月均降雨量": 47
    },
    {
      "name": "Employees",
      "月份": "Jun.",
      "月均降雨量": 20.3
    },
    {
      "name": "Employees",
      "月份": "Jul.",
      "月均降雨量": 24
    },
    {
      "name": "Employees",
      "月份": "Aug.",
      "月均降雨量": 35.6
    },
    {
      "name": "Candidates",
      "月份": "Jan.",
      "月均降雨量": 12.4
    },
    {
      "name": "Candidates",
      "月份": "Feb.",
      "月均降雨量": 23.2
    },
    {
      "name": "Candidates",
      "月份": "Mar.",
      "月均降雨量": 34.5
    },
    {
      "name": "Candidates",
      "月份": "Apr.",
      "月均降雨量": 99.7
    },
    {
      "name": "Candidates",
      "月份": "May",
      "月均降雨量": 52.6
    },
    {
      "name": "Candidates",
      "月份": "Jun.",
      "月均降雨量": 35.5
    },
    {
      "name": "Candidates",
      "月份": "Jul.",
      "月均降雨量": 37.4
    },
    {
      "name": "Candidates",
      "月份": "Aug.",
      "月均降雨量": 42.4
    }
  ]
  const config = {
    scale: { color: { palette: "paired" } },
    data:data,
    xField: '月份',
    yField: '月均降雨量',
    colorField: 'name',
    group: true,
    style: {
      inset: 5,

    },
  };
  return <Column {...config} />;
}

export default Chart;